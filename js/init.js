import * as dbh from './database_handler.js'

let database = new dbh.Database()

dbh.setDB(database)

dbh.Website.addSite("rgb","RGB Stuffs","rgbstuff/",dbh.Category.Site,"Un site pour bidouiller des couleurs RGB",["HTML","JS","CSS","WIP"])

dbh.Website.addSite("portv1","Portfolio V1","https://nilsmt.github.io/Portfolio/deprecated",dbh.Category.Site,"La 1ère version de mon portfolio",["HTML","JS","CSS"])

dbh.Website.addSite("portv2","Portfolio V2","https://nilsmt.github.io/Portfolio/",dbh.Category.Site,"La 2ème version de mon portfolio",["HTML","JS","CSS"])

dbh.Website.addSite("portv3","Portfolio V3","https://nilsmt-portfolio.vercel.app/",dbh.Category.Site,"La 3ème version de mon portfolio",["HTML","JS","CSS","Vue.js","WIP"])

dbh.Website.addSite("justflickit","Just Flick It !","https://github.com/NilsMT/Just-Flick-Itl",dbh.Category.Game,"Un jeu que je développe",["Unity","C#","WIP"])

dbh.Website.addSite("pastek","Pastek","https://scratch.mit.edu/projects/825278397/",dbh.Category.Game,"Un jeu fait au collège",["Scratch"])

dbh.Website.addSite("atlas","Atlas","https://bastianmary.github.io/ATLAS/",dbh.Category.Site,"Un site sur l'espace (réalisé en groupe)",["HTML","JS","CSS"])

dbh.Website.addSite("arch","A.R.C.H","https://www.roblox.com/games/8871746612/",dbh.Category.Game,"Mon 2ème jeu fait sur Roblox",["Lua","Roblox","WIP"])

dbh.Website.addSite("zrc","Z.R.C","https://www.roblox.com/games/7096759234/Zenium-Research-Center/",dbh.Category.Game,"Mon 1er jeu fait sur Roblox",["Lua","Roblox"])

dbh.Website.addSite("aipr","A.I.P.R","https://www.roblox.com/games/18744063505/Arch-Industries-Potato-Reactor",dbh.Category.Game,"Mon 3ème jeu fait sur Roblox",["Lua","Roblox"])

dbh.Website.addSite("animelist","Anime-List","https://anime-list-arcan.softr.app/",dbh.Category.Site,"Une liste d'anime faite sur Softr (non mise à jour)",["No-code"])

dbh.Website.addSite("github","NilsMT","https://github.com/NilsMT",dbh.Category.Social,"Mon profil GitHub",["Code"])

dbh.Website.addSite("youtube","Arcan's Mess","https://www.youtube.com/channel/UChF5gjmxeXkETkIqf_uvOFw",dbh.Category.Social,"Ma chaîne YouTube",["Vidéo"])

dbh.createfilter(database.taglist)

dbh.read(database.db)
dbh.createcollapsingeffect()

document.querySelector("header>button").addEventListener('click',function() {
    dbh.updatefilter(database.grantedtaglist)
    dbh.createcollapsingeffect()
})