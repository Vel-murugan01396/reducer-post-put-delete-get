const Mongoose=require("mongoose")

const SampleSchema=new Mongoose.Schema(
    {
        name:{
            type:String
        },
        mobile:{
            type:Number
        },
        email:{
            type:String
        }
    }
)

const SampleModel=Mongoose.model("Sample",SampleSchema)

 module.exports=SampleModel;