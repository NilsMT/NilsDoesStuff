let db = []
let taglist = new Set()
let idlist = []
const Category = {
    Site :"Site",
    Game :"Jeu-vidéo",
    Other : "Autre",
    Social : "Social"
}
class Website {
    constructor(id,main_name,link,category,additionnal_text,tags) {
        this.id = id
        this.main_name = main_name
        this.link = link
        this.category = category
        this.additionnal_text = additionnal_text
        this.tags = tags

        tags.forEach(tag => {
            taglist.add(tag)
        });

        idlist.push(id)
    }

    static addSite(id, main_name, link, category, additionnal_text, tags) {
        console.log("======= Added : "+main_name+", "+category)
        db.push(new Website(id, main_name, link, category, additionnal_text, tags))
    }
}

Website.addSite("rgb","RGB Stuffs","rgbstuff/",Category.Site,"Un site pour bidouiller des couleurs RGB",["HTML","JS","CSS","WIP"])

Website.addSite("oldport","Ancien Portfolio","https://nilsmt.github.io/Portfolio/deprecated",Category.Site,"Mon ancien portfolio",["HTML","JS","CSS"])

Website.addSite("port","Portfolio","https://nilsmt.github.io/Portfolio/",Category.Site,"Mon portfolio",["HTML","JS","CSS"])

Website.addSite("justflickit","Just Flick It !","https://nilsmt.github.io/NilsDoesStuffs/html/switch.html",Category.Game,"Un jeu que je développe",["Unity","C#","WIP"])

Website.addSite("pastek","Pastek","https://scratch.mit.edu/projects/825278397/",Category.Game,"Un jeu fait au collège",["Scratch"])

Website.addSite("atlas","Atlas","https://bastianmary.github.io/ATLAS/",Category.Site,"Un site sur l'espace (réalisé en groupe)",["HTML","JS","CSS"])

Website.addSite("arch","A.R.C.H","https://www.roblox.com/games/8871746612/",Category.Game,"Mon 2ème jeu fait sur Roblox",["Lua","Roblox","WIP"])

Website.addSite("zrc","Z.R.C","https://www.roblox.com/games/7096759234/Zenium-Research-Center/",Category.Game,"Mon 1er jeu fait sur Roblox",["Lua","Roblox"])

Website.addSite("animelist","Anime-List","https://anime-list-arcan.softr.app/",Category.Site,"Une liste d'anime faite sur Softr (non mise à jour)",["No-code"])

Website.addSite("github","NilsMT","https://github.com/NilsMT",Category.Social,"Mon profil GitHub",[])

Website.addSite("youtube","Arcan's Mess","https://www.youtube.com/channel/UChF5gjmxeXkETkIqf_uvOFw",Category.Social,"Ma chaîne YouTube",[])

//////////////////////////////////////////////////////////////////////////////
///////////////////////////////////READER
//////////////////////////////////////////////////////////////////////////////

function createfilter(list) {
    const header = document.querySelector("header")

    //add tags
    list.forEach( tag => {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('filter-tag', 'boite');

        // Create the input element
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('tag', tag);

        // Create the span element
        const span = document.createElement('span');
        span.textContent = tag;

        // Append input and span to the container div
        containerDiv.appendChild(input);
        containerDiv.appendChild(span);
        header.appendChild(containerDiv)
        input.addEventListener('change', function(){
            if (input.checked) {
                grantedtaglist.add(input.getAttribute('tag'))
            } else {
                grantedtaglist.delete(input.getAttribute('tag'))
            }
        })
    })
    
    //add button
    const button = document.createElement('button');
    button.textContent = 'Appliquer';
    button.classList.add('boite');
    header.appendChild(button)
}

function updatefilter(grantTags) { //only select the proper elements
    console.log(grantedtaglist)
    const filteredDB = db.filter(element => {
        // Check if at least one tag in the element's 'tags' array exists in 'grantTags'
        return element.tags.some(t => grantTags.has(t));
    });
    console.log(filteredDB)
    read(filteredDB)
}

function read(list) {
    const todelete = document.querySelectorAll("body>*:not(header,script,.after_that)")    
    todelete.forEach(it => {
        it.remove()
    })
    if (list.length==0) {
        const box = document.createElement("div")
        box.classList.add("flex-container")
        box.classList.add("boite")
            
        const b = document.createElement("div")
        b.classList.add("flex-item")
        b.classList.add("boite")

        const nope = document.createElement("div")
        nope.textContent = "Il n'y a rien à afficher"
        nope.classList.add("name")

        const nope2 = document.createElement("div")
        nope2.textContent = "Un jour peut-être, il y aura quelque chose"
        nope2.classList.add("desc")

        const nope3 = document.createElement("div")
        nope3.classList.add("tags")
        nope3.textContent = "Un jour..."

        b.appendChild(nope)
        b.appendChild(nope2)
        b.appendChild(nope3)

        box.appendChild(b)
        
        document.body.appendChild(box)
    } else {
        for (const catekey in Category) {
            const catename = Category[catekey]
    
            //create section
            const sec = document.createElement("section")
            sec.setAttribute("id",catename)
            //create title
            const title = document.createElement("h1")
            title.classList.add("boite")
            title.classList.add(catename)
            title.textContent=catename+" 🡖"
            //create box
            const box = document.createElement("div")
            box.classList.add("flex-container")
            box.classList.add("boite")
    
            console.log("======= Category : "+catename)
    
            const lst = list.filter((sit) => sit.category===catename)
    
            lst.sort((a, b) => {
                const hasWIP_A = a.tags.includes("WIP");
                const hasWIP_B = b.tags.includes("WIP");
    
                if (!hasWIP_A && hasWIP_B) return -1;
                if (hasWIP_A && !hasWIP_B) return 1;
    
                const nameA = a.main_name.toLowerCase();
                const nameB = b.main_name.toLowerCase();
    
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            });
            
    
            if (lst.length>0) {
                lst.forEach( site => {
    
                    console.log(site.main_name)
    
                    //create the square
                    const link = document.createElement("a")
                    link.classList.add("flex-item")
                    link.classList.add("boite")
                    link.setAttribute("id",site.id)
    
                    if (site.tags.includes("WIP")) { //if there is the tag wip add the so-called class
                        link.classList.add("wip")
                    }
    
                    link.setAttribute("href",site.link)
                    link.setAttribute("target","")
    
                    //add stuff inside
                    const name_box = document.createElement("div")
                    name_box.textContent = site.main_name
                    name_box.classList.add("name")
    
                    const desc_box = document.createElement("div")
                    desc_box.textContent = site.additionnal_text
                    desc_box.classList.add("desc")
    
                    const tags_box = document.createElement("div")
                    tags_box.classList.add("tags")
    
                    site.tags.forEach(function(txt, i, array){
                        if (i === array.length - 1){ 
                            tags_box.textContent+=txt
                        } else {
                            tags_box.textContent+=txt+", "
                        }
                    });
    
                    //append everything
                    link.appendChild(name_box)
                    link.appendChild(desc_box)
                    link.appendChild(tags_box)
                    box.appendChild(link)
                    
                })
                sec.appendChild(title)
                sec.appendChild(box)
                const tar = document.querySelector(".after_that") 
                tar.insertAdjacentElement('afterend', sec);
            }
        }
    }
}

function css(element,style) {
    for (const property in style) {
        element.style[property] = style[property]
    }
}

function createcollapsingeffect() {
    const toggleButtons = document.querySelectorAll('section>h1');

    console.log("clicked")

    toggleButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const content = this.nextElementSibling;
            console.log("clicked")
            if (content.style.display!='none') {
                content.style.display='none'

                const txt = button.textContent.slice(0, button.textContent.length-2)
                button.textContent = txt+"🡔"
            } else {
                content.style.display='flex'

                const txt = button.textContent.slice(0, button.textContent.length-2)
                button.textContent = txt+"🡖"
            }
        });
    });
}

var grantedtaglist = new Set()
console.log(idlist)

createfilter(taglist)

read(db)
createcollapsingeffect()

document.querySelector("header>button").addEventListener('click',function() {
    updatefilter(grantedtaglist)
    createcollapsingeffect()
})