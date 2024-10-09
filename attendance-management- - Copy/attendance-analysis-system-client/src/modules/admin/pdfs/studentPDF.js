import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
	body: {
		padding: 50,
	},
	container: {
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: 5,
	},

	headingContainer: {
		marginBottom: 15,
	},
	headingText: {
		fontSize: 20,
	},
	subHeadingText: {
		fontSize: 12,
	},
	captionText: {
		fontSize: 8,
	},
	table: {
		marginRight: "auto",
		marginLeft: "auto",
		display: "table",
		width: "100%",
		borderStyle: "solid",
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0,
	},
	tableRow: {
		margin: "auto",
		flexDirection: "row",
	},

	tableCol: {
		// width: "16.7%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	tableSubHeadCol: {
		width: "50%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderBottomWidth: 0,
	},
	tableLastSubHeadCol: {
		width: "50%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderBottomWidth: 0,
		borderRightWidth: 0,
	},
	tableHead: {
		margin: "auto",
		marginTop: "auto",
		fontSize: 8,
		marginBottom: "auto",
	},
	tableCell: {
		margin: "auto",
		marginTop: 5,
		marginBottom: 5,
		fontSize: 8,
	},
	tableSubHeadCellCol: {
		width: "50%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderBottomWidth: 0,
		borderTopWidth: 0,
	},
	tableLastSubHeadCellCol: {
		width: "50%",
		borderStyle: "solid",
	},
	mainHead: {
		marginBottom: 5,
		marginTop: 5,
		textDecoration: "underline",
		fontSize: 10,
	},
});

// Create Document Component
export const MyStuDocument = (props) => {
	const cols = props.cols.map((r) => r.id.replace(" ", "").toLowerCase());
	styles.tableCol.width = Math.round((100 / cols.length) * 100) / 100 + "%";
	let rows = props.rows?.map((row, key) => {
		return cols.map((col, k) => {
			return row[col]?.children
				? { value: { children: row[col]?.children.map((c) => c) } }
				: { value: row[col] };
		});
	});
	return (
		<Document>
			<Page style={styles.body}>
				<View style={styles.headingContainer}>
					<View style={styles.container}>
						<Text style={styles.headingText}>Anurag Group of Institutions</Text>
					</View>
					<View style={styles.container}>
						<Text style={styles.subHeadingText}>
							(Formally CVSR College of Engineering)
						</Text>
					</View>
					<View style={styles.container}>
						<Text style={styles.captionText}>
							{"Accredited by NBA, Approved by AICTE & Affliated to JNTU"}
						</Text>
					</View>

					<View style={styles.container}>
						<Text style={styles.mainHead}>ATTENDANCE OF STUDENTS</Text>
					</View>
				</View>

				<View style={styles.table}>
					<View style={styles.tableRow}>
						{props.cols.map((col, key) => {
							return (
								<View style={styles.tableCol} key={key}>
									{col.children ? (
										<Text style={styles.tableCell}>{col.name}</Text>
									) : (
										<Text style={styles.tableHead}>{col.name}</Text>
									)}
									{col.children && (
										<View style={styles.tableRow}>
											{col.children.map((c, i) => {
												return (
													<View
														key={i}
														style={
															i === col.children.length - 1
																? styles.tableLastSubHeadCol
																: styles.tableSubHeadCol
														}
													>
														<Text style={styles.tableCell}>{c.name}</Text>
													</View>
												);
											})}
										</View>
									)}
								</View>
							);
						})}
					</View>
					{rows?.map((row, key) => {
						return (
							<View style={styles.tableRow} key={key}>
								{row.map((r, ke) => {
									return !r.value.children ? (
										<View style={styles.tableCol} key={ke}>
											<Text style={styles.tableCell}>{r.value}</Text>
										</View>
									) : (
										<View style={styles.tableCol} key={ke}>
											<View style={styles.tableRow}>
												{r.value.children.map((c, k) => {
													return (
														<View
															key={k}
															style={
																k === r.value.children.length - 1
																	? styles.tableLastSubHeadCellCol
																	: styles.tableSubHeadCellCol
															}
														>
															<Text style={styles.tableCell}>{c}</Text>
														</View>
													);
												})}
											</View>
										</View>
									);
								})}
							</View>
						);
					})}
				</View>
			</Page>
		</Document>
	);
};
