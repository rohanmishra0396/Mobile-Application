const domain = `http://10.0.2.2:8080`;

const fetchClasses = async id => {
  let result = await fetch(`${domain}/teacher/fetch/${id}/class`);
  return result.json();
};

const fetchDivisionInfo = async id => {
  let result = await fetch(`${domain}/student/fetch/division?students=${id}`);
  return result.json();
};

const updateStudentData = async data => {
  let result = await fetch(`${domain}/student/record`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  return result.json();
};

const getStudentRecord = async id => {
  let result = await fetch(`${domain}/student/${id}`);
  return result.json();
};

module.exports = {
  fetchClasses,
  fetchDivisionInfo,
  updateStudentData,
  getStudentRecord,
};
