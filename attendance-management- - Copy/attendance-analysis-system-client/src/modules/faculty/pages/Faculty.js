import React, { useCallback, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  getFacultyByUserID,
  getFacultySubjectDetails,
  getSubjects,
} from "../../../redux/actions/userAction";
import AttendanceUploadModal from "../modals/AttendanceUploadModal";

const Faculty = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isSubjectDetailsLoading, setIsSubjectDetailsLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("");

  const fetchFacultyDetails = useCallback(async () => {
    await dispatch(getFacultyByUserID()).catch((err) => {});
  }, [dispatch]);
  const getSubjectsData = useCallback(async () => {
    await dispatch(getSubjects()).catch((err) => {});
  }, [dispatch]);

  const fetchFacultySubjectDeatils = async (value) => {
    setSelectedSubject(user.subjects.filter((r) => r._id === value)[0]);
    setIsSubjectDetailsLoading(true);
    await dispatch(getFacultySubjectDetails(value))
      .then(() => {
        setIsSubjectDetailsLoading(false);
      })
      .catch((err) => {
        setIsSubjectDetailsLoading(false);
      });
  };
  useEffect(() => {
    getSubjectsData();
    fetchFacultyDetails();
  }, [getSubjectsData, fetchFacultyDetails]);

  let columns = [
    { selector: (row) => row.rollNumber, name: "Roll Number" },
    { selector: (row) => row.studentName, name: "Student Name" },
    {
      selector: (row) => row.attendedClasses,
      name: "Attended Classes",
      right: true,
    },
    { selector: (row) => row.percent, name: "Percentage (%)", right: true },
    { selector: (row) => row.actions, name: "Actions" },
  ];

  let rows = user.facultySubjectDetails?.map((att) => {
    return {
      rollNumber: att.studentID?.rollNumber,
      studentName: att.studentID?.name,
      attendedClasses: att.classesAttended,
      percent:
        Math.round(
          (att.classesAttended / selectedSubject.totalClasses) * 100 * 100
        ) / 100,
      actions: (
        <div>
          <AttendanceUploadModal
            id={att._id}
            getSubjectDetails={fetchFacultySubjectDeatils}
          />
        </div>
      ),
    };
  });
  return (
    <div className="bg">
      <Container>
        <div className="row mb-5 mt-5">
          <div className="col-12 mb-1">
            <div className="row">
              <div className="col-2 text-bold">Name</div>
              <div className="col-3">{user.facultyDetails?.name}</div>
            </div>
          </div>

          <div className="col-12 mb-1">
            <div className="row">
              <div className="col-2 text-bold">Email</div>
              <div className="col-3">
                {user.facultyDetails?.userID?.email || "-"}
              </div>
            </div>
          </div>
          <div className="col-12 mb-1">
            <div className="row">
              <div className="col-2 text-bold">Phone number</div>
              <div className="col-3">
                {user.facultyDetails?.userID?.phoneNumber || "-"}
              </div>
            </div>
          </div>
          <div className="col-12 mb-2">
            <div className="row">
              <div className="col-2 text-bold">Department</div>
              <div className="col-3">
                {user.facultyDetails?.departmentID?.name}
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-2 text-bold">Subjects</div>
              <div className="col-3">
                <Form.Select
                  aria-label="Select Subject"
                  placeholder="Select Subject"
                  name="subjectID"
                  onChange={(e) => fetchFacultySubjectDeatils(e.target.value)}
                  required
                  size="sm"
                >
                  <option value="">Select Subject</option>
                  {user.facultyDetails?.subjects?.map((sub, key) => (
                    <option value={sub._id} key={key}>
                      {sub.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-5 mt-5">
          <div className="col-12">
            {selectedSubject && (
              <div className="col-12 position-relative">
                <div className="btn-position">
                  <span className="text-bold">Total classes: </span>
                  <span>{selectedSubject?.totalClasses}</span>
                </div>
                <DataTable
                  title={selectedSubject?.name}
                  columns={columns}
                  data={rows}
                  striped
                  progressPending={isSubjectDetailsLoading}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Faculty;
