import express from "express";
import {Request, Response, NextFunction} from 'express';
import {createUser, login, findUser, updateUser, findUserById, findUsersByRole, findUsers} from "./userControler.js"
import { auth, errorHandler, isAdminCheck } from "../../core/middlewares.js";

const userRouter = express.Router()

// create user endpoint
userRouter.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await createUser(req.body))
    } catch(e){
        next(e)
    }
});

// login endpoint
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction)=>{
    try{ 
        res.json(await login(req))
    } catch(e){
        next(e)
    }
}) 


userRouter.get('/find',  async (req: Request, res: Response, next: NextFunction) => {
    try{
        res.json(await findUsers(req.query.name))
    } catch(e){
        next(e)
    }
})

// find user by id (profile finder)
userRouter.get('/:id', auth, async (req: Request, res: Response, next: NextFunction) =>{
    try{
        res.json(await findUserById(req.params.id, req.payload))
    } catch(e){
        next(e)
    }
})


// edit user
userRouter.put('/',auth, async (req: Request, res: Response, next: NextFunction) =>{
    try{
        res.json(await updateUser(req.body, req.payload))
    } catch(e){
        next(e)
    }
})

userRouter.get('/', auth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await findUsersByRole(req.query.role))
    } catch(e){
        next(e)
    }
})

userRouter.use(errorHandler)
export default userRouter