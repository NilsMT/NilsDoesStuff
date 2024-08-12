import * as dbh from './database_handler.js'

let database = new dbh.Database()

dbh.setDB(database)

dbh.Website.addSite("gray","RGB to Grayscale","html/rgb_grayscale_color.html",dbh.Category.Site,"Transforme une couleur RGB en une couleur en niveaux de gris",["Échelle de gris"])

dbh.Website.addSite("comp","RGB to Complementary","html/rgb_complementary_color.html",dbh.Category.Site,"Transforme une couleur RGB en sa couleur complémentaire",["Complémentaire"])


dbh.createfilter(database.taglist)

dbh.read(database.db)
dbh.createcollapsingeffect()

document.querySelector("header>button").addEventListener('click',function() {
    dbh.updatefilter(database.grantedtaglist)
    dbh.createcollapsingeffect()
})