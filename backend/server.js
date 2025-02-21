const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const USER_ID = "himanshu_kumar_25091999"; // Change this to your full name & DOB
const EMAIL = "himanshu@example.com"; // Change this to your email
const ROLL_NUMBER = "CU123456"; // Change this to your roll number

// POST /bfhl → Process data
app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid input format" });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highest_alphabet = alphabets.length ? [alphabets.sort().pop()] : [];

  res.json({
    is_success: true,
    user_id: USER_ID,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    numbers,
    alphabets,
    highest_alphabet,
  });
});

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
