import express from "express";
// import { prisma } from "../db/index.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();
router.get('/', async (req, res) => {
    const { firstName, lastName } = req.body;
try {
    const users = await prisma.user.findMany({
        where: {
            firstName: firstName,
            lastName: lastName
        }
    });

    if (users) {
        res.status(200).json({
            success: true,
            users
            
        });
    };
} catch (e) {
    res.status(500).json({
        success: false,
        message: "Could not find users"
    });
};
   
    res.json(users)
    res.status(200).json({
        success: true
      })
    
  });

router.post('/', async (req, res) => {
    const { firstName, lastName } = req.body;
    const newUser = await prisma.user.create({
        data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        },
    });
    
    res.json(newUser)
    res.status(201).json({
        success: true,
       
      })
    
    });


router.post('/users/admins', async (req, res) => {
        const { firstName, lastName, isAdmin, isActive } = req.body;
        const newUser = await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                isAdmin: req.body.isAdmin,
                isActive: req.body.isActive,
                },
        });
        res.json(newUser);
        });

router.get('/users/admins', async (req, res) => {
    const { firstName, lastName, isAdmin, isActive } = req.body;
    const newUser = await prisma.user.findMany({
        data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isAdmin: req.body.isAdmin,
        isActive: req.body.isActive,
        },
    });
    res.json(newUser);
    res.status(200).json({
        success: true,
       
      })
    });

router.get("/:userId", async (req, res) => {
        const id = req.params.userId;

        try {
            const user = await prisma.user.findFirstOrThrow({
                where: {
                    id: parseInt(id)
                }
            });

            if (user) {
                res.status(200).json({
                    success: true,
                    user
                });
            };
        } catch (e) {
            res.status(500).json({
                success: false,
                message: "Could not find user"
            });
        };
    });

router.put("/:userId", async (req, res) => {
            const id = req.params.userId;

            try {
                const user = await prisma.user.findFirstOrThrow({
                    where: {
                        id: parseInt(id),
                        userId: req.user.id
                    }
                });

                if (user) {
                    const updatedUser = await prisma.user.update({
                        where: {
                            id: parseInt(id)
                        },
                        data: {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName
                        }
                    });

                    if (updatedUser) {
                        res.status(200).json({
                            success: true
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            message: "Failed to update user"
                        });
                    };
                };
            } catch (e) {
                res.status(500).json({
                    success: false,
                    message: "Could not find user"
                });
            };
        });
router.delete("/:userId", async (req, res) => {
        const id = req.params.userId;

        try {
                const deleteUser = await prisma.user.delete({
                    where: {
                        id: parseInt(id)
                    }
                });

                if (deleteUser) {
                    res.status(200).json({
                        success: true
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        message: "Failed to delete user"
                    });
                };
            } catch (e) {
            res.status(500).json({
                success: false,
                message: "Could not find user"
            });
        };
    });
export default router;
