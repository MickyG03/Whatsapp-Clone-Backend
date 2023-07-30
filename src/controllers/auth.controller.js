export const register = async (req,res,next)=>{

    try{
        res.send(req.body);
    }catch(error){
        next(error)
    }

}
export const login = async (req,res,next)=>{

    try{

    }catch(error){
        next(error)
    }

}

export const logout = async (req,res,next)=>{

    try{

    }catch(error){
        next(error)
    }

}

export const refreshtoken = async (req,res,next)=>{

    try{

    }catch(error){
        next(error)
    }

}