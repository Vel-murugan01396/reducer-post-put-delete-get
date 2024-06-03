const SampleModel=require("../models/Sample")


const PostForm=async(req,res)=>{


    try {
        const {name,mobile,email}=req.body

const FormProcess=new SampleModel({
    name,mobile,email
})

const FormSave=await FormProcess.save();
res.status(200).json(FormSave)
    } catch (error) {
        res.status(500).json({message:"internal error"})
        
    }

}

const GetForm=async(req,res)=>{
try {
    const FormGet=await SampleModel.find()
    res.status(200).json(FormGet)
} catch (error) {
    res.status(500).json({message:"internal error"})
}
}


const UpdateForm=async(req,res)=>{
try {
    const {id}=req.params;
    const{name,mobile,email}=req.body;
    const UpdateValue=await SampleModel.findByIdAndUpdate(
        id,
        {name,mobile,email},
        {new:true}
    )
    res.status(200).json(UpdateValue)
} catch (error) {
    res.status(500).json({message:"Not UpdateValue"})
}
}

const DeleteForm=async(req,res)=>{

    try {
        const {id}=req.params;
        const DeleteValue=await SampleModel.findByIdAndDelete(id)
        res.status(200).json(DeleteValue)
    } catch (error) {
        res.status(200).json({message:"not DeleteValue"})
    }
       
}

module.exports={PostForm,GetForm,UpdateForm,DeleteForm}

