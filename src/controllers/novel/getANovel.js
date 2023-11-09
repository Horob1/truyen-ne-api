import AppError from "../../utils/appError";
import Novel from "../../models/novelModel.js"

module.export = async (req,res,next) => {
    try {
        const novel = await Novel.findById(req.params.id);
        if(!novel) return next(new AppError("'No document found with this ID'",404));

        res.status(200).json({
            status: "success",
            novel
        });
    } catch (error) {
        res.status(500).json(err);
    }
} 