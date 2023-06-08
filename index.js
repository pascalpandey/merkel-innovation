const express = require("express");
const app = express();

app.get("/test", (req, res) => {
  res.send("<h1>It's working 🤗</h1>");
});

// TASK 1
app.get("/task1", async (req, res) => {
  try {
    let sequence = "";
    for (let i = 1; i <= 5; i++) {
      for (let j = 1; j <= 5; j++) {
        sequence = sequence + (i * j).toString() + " ";
      }
      sequence = sequence + "\n";
    }
    res.write(sequence);
    res.end();
  } catch (error) {
    console.log(error);
    res.send();
  }
});

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// TASK 2
// guest endpoints
app.post("/task2/guestforms", async (req, res) => {
  try {
    const { name, address = "", phone = "", note } = req.query;
    const guest = await prisma.guest.findUnique({
      where: {
        name: name,
      },
    });

    // guest not yet registered
    if (!guest) {
      await prisma.guest.create({
        data: {
          name: name,
          address: address,
          phone: phone,
        },
      });
    }

    await prisma.note.create({
      data: {
        content: note,
        author: {
          connect: {
            name: name
          }
        },
      },
    });
    res.status(200).json({ message: "guestform created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Bad input" });
  }
});

app.get("/task2/note", async (req, res) => {
  const out = await prisma.note.findMany({});
  res.send(out);
});


// admin endpoints
async function validateAdmin(name, password) {
  const adminFound = await prisma.admin.findUnique({
    where: {
      name: name,
    },
  });
  if (adminFound.password === password) {
    return true;
  } else {
    return false;
  }
}

app.post("/task2/admin", async (req, res) => {
  const { adminname, password, newadminname, newpassword } = req.query;
  if (await validateAdmin(adminname, password)) {
    await prisma.admin.create({
      data: {
        name: newadminname,
        password: newpassword,
      }
    });
    res.status(200).json({message: 'new admin created'});
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.get("/task2/admin/note", async (req, res) => {
  const { adminname, password } = req.query;
  if (await validateAdmin(adminname, password)) {
    const out = await prisma.note.findMany({
      include: {
        author: true
      }
    });
    res.send(out);
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.get("/task2/admin/guest", async (req, res) => {
  const { adminname, password } = req.query;
  if (await validateAdmin(adminname, password)) {
    const out = await prisma.guest.findMany({
      include: {
        notes: true
      }
    });
    res.send(out);
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.delete("/task2/admin/note", async (req, res) => {
  const { adminname, password, noteid } = req.query;
  if (await validateAdmin(adminname, password)) {
    try {
      await prisma.note.delete({
        where: {
          id: Number(noteid),
        },
      });
      res.status(200).json({ message: "note delete success" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Bad input" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.delete("/task2/admin/guest", async (req, res) => {
  const { adminname, password, guestname } = req.query;
  if (await validateAdmin(adminname, password)) {
    try {
      await prisma.guest.delete({
        where: {
          name: guestname,
        },
      });
      res.status(200).json({ message: "guest delete success" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Bad input" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
