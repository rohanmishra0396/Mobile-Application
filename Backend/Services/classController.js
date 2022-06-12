const fetchClasses = async (id) => {
  try {
    console.log("[START] fetchClasses controller");

    const db = await require("../db/mongodb").db();

    const schoolCollection = db.collection("schoolManagement");

    const findResult = await schoolCollection
      .find({ id: parseInt(id) })
      .toArray();

    console.log("Found documents =>", findResult);

    console.log("[END] fetchClasses controller");
    //db.close();
    return findResult;
  } catch (error) {
    console.log("Error occurred in fetchClasses controller " + error.message);
    throw error;
  }
};

const fetchClassInfo = async (id) => {
  try {
    console.log("[START] fetchClassInfo controller");

    const db = await require("../db/mongodb").db();

    const classCollection = db.collection("classCollection");

    const findResult = await classCollection.find({ id: id }).toArray();

    console.log("Found documents =>", findResult);

    console.log("[END] fetchClassInfo controller");
    //db.close();
    return findResult;
  } catch (error) {
    console.log("Error occurred in fetchClassInfo controller " + error.message);
    throw error;
  }
};

module.exports.fetchClasses = fetchClasses;
module.exports.fetchClassInfo = fetchClassInfo;
