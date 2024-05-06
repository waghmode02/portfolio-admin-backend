import Skill from '../models/skillModel.js';

export const getSkill= async(req,res)=>{
    try{
        const data =await Skill.find();
        if(!data){
            return res.status(404).json({msg: "user data not found"});
        }
        else{
            res.status(200).json(data);
        }
    }catch(error){
        res.status(500).json({error:error});
    }
}

export const deleteSkill = async (req, res) => {
    try {
      const id = req.params.id;
  
      const data= await Skill.findById(id);
      if (!data) {
        return res.status(404).json({ error: 'Project not found' });
      }
      else{
    
        await Skill.findByIdAndDelete(id);
    
        res.status(200).json({ success: true, message: 'Project deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
