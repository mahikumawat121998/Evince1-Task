import { db } from "../connect.js";
import nodemailer from "nodemailer";
import { sendEmail } from "./sendEmail.js";
function generateSixDigitNumber() {
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  return randomNumber;
}
export const register = async (req, res) => {
  const q =
    "INSERT INTO user_data (`username`,`email`,`employee_id`,`gender`,`mobile`,`age`,`other_mobile`) VALUE (?)";
  const values = [
    req.body.username,
    req.body.email,
    req.body.employee_id,
    req.body.gender,
    req.body.mobile,
    req.body.age,
    req.body.other_mobile,
  ];

  console.log("values", values);
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ data });
  });
};

export const login = (req, res) => {
  const q =
    "SELECT * FROM user_info WHERE name = ? AND otp_validation=1 AND phone=?";
  db.query(q, [req.body.name, req.body.phone], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    if (data.length > 0) res.status(200).json(data);
  });
};

export const login1 = (req, res) => {
  const q = "SELECT * FROM user_data";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    if (data.length > 0) res.status(200).json(data);
  });
};

export const deleteData = (req, res) => {
  const DataId = req.params.id;
  console.log("DataId", DataId);
  const q = "DELETE FROM user_data WHERE user_id = ? ";
  db.query(q, [DataId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

export const editData = (req, res) => {
  const dataId = req.params.id;
  const q =
    "UPDATE user_data SET `username`= ?, `email`= ?, `employee_id`= ?, `gender`= ?,`age`=?, `other_mobile`=? WHERE user_id = ?";

  const values = [
    req.body.username,
    req.body.email,
    req.body.employee_id,
    req.body.gender,
    req.body.age,
    req.body.other_mobile,
  ];

  db.query(q, [...values, dataId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

export const otp_authentication = (req, res) => {
  const query1 = "SELECT * FROM user_info WHERE id = ?";
  db.query(query1, [req.body.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    if (data[0].otp != req.body.otp_validation)
      return res.status(404).json("Please Enter valid OTP");
    if (data.length > 0 && data[0].otp == req.body.otp_validation) {
      // console.log("data.otp==req.body.otp",data[0].otp,req.body.otp_validation)
      const bookId = req.params.id;
      const q = "UPDATE user_info SET `otp_validation`= ? WHERE id = ?";
      const values = [true];
      db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
    }
  });
};
