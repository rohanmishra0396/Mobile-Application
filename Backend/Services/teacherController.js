const fetchTeacherClass = async () => {
  try {
    console.log("[START] fetchTeacherClass controller");

    const db = await require("../db/mongodb").db();

    const teacherCollection = db.collection("TeacherManagement");

    //const findResult = await schoolCollection.find({}).toArray();
    const findResult = await teacherCollection
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
      ])
      .toArray();
    console.log("Found documents =>", findResult);

    console.log("[END] fetchTeacherClass controller");
    //db.close();
    return findResult;
  } catch (error) {
    console.log(
      "Error occurred in fetchTeacherClass controller " + error.message
    );
    throw error;
  }
};

module.exports.fetchTeacherClass = fetchTeacherClass;
