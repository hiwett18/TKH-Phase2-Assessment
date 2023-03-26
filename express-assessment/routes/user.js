import express from "express";


export default function userRouter() {
const router = express.Router();

// Create the routes here
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });

app.get('/users/admins', async (req, res) => {
const users = await prisma.user.findMany();
res.json(users);
});

app.post('/users', async (req, res) => {
const { firstName, lastName, isAdmin, isActive } = req.body;
const newUser = await prisma.user.create({
    data: {
        firstName: "James",
        lastName: "Smith",
    },
});
// res.status(201);
// console.log(res.json(newUser));

res.status(201).json({
    success: true
  })

});

app.post('/users/admins', async (req, res) => {
    const { firstName, lastName, isAdmin, isActive } = req.body;
    const newUser = await prisma.user.create({
        data: {
        firstName,
        lastName,
        isAdmin,
        isActive,
        },
    });
    res.json(newUser);
    });

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  });

app.put('/users/:id', async (req, res) => {
const { id } = req.params;
const { firstName, lastName, isAdmin, isActive } = req.body;
const updatedUser = await prisma.user.update({
    where: {
    id: parseInt(id),
    },
    data: {
    firstName,
    lastName
    },
});
res.json(updatedUser);
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(deletedUser);
  });
  return router
}
