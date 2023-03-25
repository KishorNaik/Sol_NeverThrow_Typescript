import { rejects } from "assert";
import { Result,Err, Ok } from "neverthrow";

class ResultError extends Error
{
    private readonly _statusCode:number;
    public constructor(errorMessage:string,statsCode:number){
        super(errorMessage);
        this._statusCode=statsCode;
    }

    public get StatusCode(): number{
        return this._statusCode;
    }
}

interface IUser{
    name:string;
    age:number;
}

const GetData=(name:string|undefined,age:number|undefined):Promise<Result<IUser,ResultError>>=>{
    return new Promise((resolve,rejects)=>{

        try
        {
            if(name===undefined){
                return resolve(new Err<IUser,ResultError>(new ResultError("Name should not be empty",400)));
            }

            if(age===undefined){
                return resolve(new Err<IUser,ResultError>(new ResultError("age should not be empty",400)));
            }

            return resolve(new Ok<IUser,ResultError>({
                name:name,
                age:age
            }));
        }
        catch(ex)
        {
            rejects(ex);
        }

    })
}

const main=async(): Promise<void>=>{

    try
    {
        const result=await GetData(undefined,undefined); 
        //const result=await GetData('kishor',36); 

        if(result.isOk()){

            let userObj:IUser=result.value;
            console.log(`User Object => ${JSON.stringify(userObj)}`);
        }
        else
        {
            let resultError:ResultError=result.error;
            console.log(`Error Message : => ${resultError.message}`);
            console.log(`Status Code => ${resultError.StatusCode}`);
        }
    }
    catch(ex){
        console.log(`Exception => ${(<Error>ex).message}`);
    }

};

main()
    .then((result)=> console.log(result))
    .catch((ex)=> console.log(ex));
