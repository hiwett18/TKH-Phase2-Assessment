import express from "express";
// import { prisma } from "../db/index.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();
router.get('/', async (req, res) => {

try {
    const users = await prisma.user.findMany({
        where: {
            isActive: true
        }
    });

    if (users) {
        console.log(users)
        console.log(users.length)
        res.status(200).json({
            success: true,
            users
            
        });
    };
} catch (e) {
    console.log(e)
    res.status(400).json({
        success: false,
        message: "Could not find users"
    });
};
   
 
    
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


router.post('/admins', async (req, res) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                isAdmin: req.body.isAdmin !== "" ? req.body.isAdmin: false,
                isActive: req.body.isActive !== "" ? req.body.isAdmin: true,
                },
        });
        
        if (newUser) {
            console.log(newUser)
            res.status(201).json({
                success: true,
                newUser
            })
        } else {
            res.status(400).json({
                success: false,
                message: "User was not created"
            })
        }
    } catch (e){
        console.log(e);
        res.status(400).json({
            success: false, 
            message: "Error"
            })
        }
        });

router.get('/admins', async (req, res) => {
   try {
    const admins = await prisma.user.findMany({
        where: {
            isAdmin:true,
        },
    })
       if (admins) {
        res.status(200).json({
            success: true,
            users: admins
        })
       } else {
        res.status(400).json({
            success: false,
            message: "admin not found"
        });
       }

    } catch(e){
        console.log(e)
        res.status(400).json({
            success: false,
            message: "Error"
        })
    }
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
