const User = require("../models/User");
const Foto = require("../models/Foto");

/*private post process*/
exports.postFotoProcess = async(req, res)=>{
	const  {comment} = req.body;
	const {path} = req.file;
	if(comment === ""){
		return res.render("auth/private", {message : "You need to fill in the data."})
	}
	const actualUser = req.user;
	console.log(req.user.id);
	const newFoto = await Foto.create({
		comment,
		img : path,
		owner : actualUser.username,
		ownerId : req.user.id,
	})
	console.log(newFoto)
	await User.findOneAndUpdate(actualUser.email, {$push : {fotos : newFoto}})
	res.redirect("/");
}

/*delete fotoPost*/
exports.deleteFotoView = async (req,res)=>{
	const {fotoId} = req.params;
	const foto = await Foto.findById(fotoId);
	res.render("auth/delete", foto);
}

exports.deleteFotoProcess = async(req,res)=>{
	const fotoId = req.params
	const deleteFoto = await Foto.findByIdAndDelete(fotoId);
	console.log(deleteFoto);
	res.redirect("/auth/private");
}