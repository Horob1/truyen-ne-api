import Chapter from '../../models/chapterModel.js'

export const getChapterList = async (req,res,next) => {
    try {
        
        const novel = req.params.id;
        const chapterList = await Chapter.find({novel: novel}).select('name _id number createTime');

        res.status(200).json({
            status: "success",
            chapterList
        });
    } catch (error) {
        res.status(500).json(err);
    }
} 