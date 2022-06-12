const fetchClassStudents = async () => {
  try {
    console.log("[START] fetchClassStudents controller");

    const db = await require("../db/mongodb").db();

    const schoolCollection = db.collection("schoolManagement");

    //const findResult = await schoolCollection.find({}).toArray();
    const findResult = await schoolCollection
      .aggregate([
        {
          $lookup: {
            from: "classCollection",
            localField: "classes",
            foreignField: "id",
            as: "classInfo",
          },
        },
        { $unwind: "$classInfo" },
        {
          $lookup: {
            from: "studentManagement",
            localField: "classInfo.studentsReport",
            foreignField: "name",
            as: "studentInfo",
          },
        },
        { $unwind: "$studentInfo" },
      ])
      .toArray();
    console.log("Found documents =>", findResult);

    console.log("[END] fetchClassStudents controller");
    //db.close();
    return findResult;
  } catch (error) {
    console.log(
      "Error occurred in fetchClassStudents controller " + error.message
    );
    throw error;
  }
};

const fetchDivisionStudents = async ({ students }) => {
  try {
    console.log("[START] fetchClassStudents controller");

    const db = await require("../db/mongodb").db();

    const studentManagement = db.collection("studentManagement");
    let param = students.split(",");
    console.log("params ", param);
    const findResult = await studentManagement
      .find({ id: { $in: param } })
      .toArray();
    console.log("Found documents =>", findResult);

    console.log("[END] fetchClassStudents controller");
    //db.close();
    return findResult;
  } catch (error) {
    console.log(
      "Error occurred in fetchClassStudents controller " + error.message
    );
    throw error;
  }
};

const updateStudentData = async ({ payload }) => {
  try {
    console.log("[START] updateStudentData controller");

    const db = await require("../db/mongodb").db();

    const studentManagement = await db.collection("studentManagement");
    console.log(payload.id);
    console.log(payload);
    const student = await studentManagement.findOne({ id: payload.id });
    console.log("from database ", JSON.stringify(student));
    modifyUpdatePayload({ payload, student });

    console.log("Updated payload " + JSON.stringify(student));

    const updateResult = await studentManagement.replaceOne(
      { id: payload.id },
      student
    );

    console.log("Updated documents =>", updateResult);

    console.log("[END] updateStudentData controller");
    //db.close();
    return updateResult;
  } catch (error) {
    console.log(
      "Error occurred in fetchClassStudents controller " + error.message
    );
    throw error;
  }
};

const modifyUpdatePayload = async ({ student, payload }) => {
  console.log("[START] modifyUpdatePayload function");
  console.log(payload.language);
  switch (payload.language) {
    case "English":
      console.log("in switch case");
      student.classes[payload.class].Reading.English = payload.result;
      break;
    case "Hindi":
      student.classes[payload.class].Reading.Hindi = payload.result;
      break;

    case "Marathi":
      student.classes[payload.class].Reading.Marathi = payload.result;
      break;

    case "Mathematics":
      student.classes[payload.class].Maths.Rating = payload.Rating;
      break;

    default:
      break;
  }
  console.log("modifyUp[date ", JSON.stringify(student));
  console.log("[END] modifyUpdatePayload function");
};

const getStudentData = async ({ studentId }) => {
  try {
    console.log("[START] getStudentData controller");

    const db = await require("../db/mongodb").db();

    const studentCollection = db.collection("studentManagement");

    const findResult = await studentCollection
      .find({ id: studentId })
      .toArray();

    console.log("Found documents =>", findResult);

    console.log("[END] getStudentData controller");
    //db.close();
    return findResult;
  } catch (error) {
    console.log("Error occurred in getStudentData controller " + error.message);
    throw error;
  }
};

module.exports.getStudentData = getStudentData;
module.exports.fetchDivisionStudents = fetchDivisionStudents;
module.exports.updateStudentData = updateStudentData;
