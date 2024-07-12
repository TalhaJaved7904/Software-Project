import { getDatabase, onValue, push, ref, set, remove } from "firebase/database";
import app from "./firebaseconfig"


export const db = getDatabase(app);

export const sendData = (nodeName:string,data:any) => {

        return new Promise((resolve,reject) =>{
        data.id = push(ref(db, `${nodeName}`)).key;
        const reference = ref(db, `${nodeName}/${data.id}`);
        set(reference,data)
            .then(() => {
                resolve(data);
            })
            .catch((err) =>{
                reject(err);
            });

        });       
};

export const getData = (nodeName:any, classID?:any) => {

    return new Promise((resolve,reject) => {
        
        const refernce = ref(db, `${nodeName}/${classID ? classID : "" }`);
    
        onValue(refernce,(dt) => {
            // console.log(Object.values(dt.val()))
            if (dt.exists()) {
                resolve(dt.val());
                // resolve(dt.val());
            } else {
                reject({message:"Data not found"})
            } 
        });
    });
};


export const editData = (nodeName:string,id:any,body:any) => {
    return new Promise((resolve,reject) => {
        const reference = ref(db, `${nodeName}/${id}`)
        set(reference,body)
        .then(()=>{
            resolve({ message: "Record Edited Successfully"});
        })
        .catch((err) =>{
            reject(err);
        })
    })
}


export const delRecord = (nodeName:string,id:any) => {
    return new Promise ((resolve,reject) => {
        const reference = ref(db,`${nodeName}/${id}`)
        remove(reference)
        .then(()=>{
            resolve({message:"Deleted Successfully"});
        })
        .catch((err) => {
            reject(err);
        });
    });
}
