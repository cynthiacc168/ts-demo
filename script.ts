//fetch data
const dataUrl : string = "https://api.thecatapi.com/v1/images/search";

async function getJson<T>(url:string):Promise<T>{
    const response:Response = await fetch(url)
    const json: Promise<T> = await response.json()
    return json
}

//add eventlistener to main-bt
const mainBtn: HTMLElement | null = document.getElementById("main-btn");
// const button: HTMLButtonElement | null = document.querySelector('button');

mainBtn?.addEventListener<'click'>('click',getData)

interface CatType{
    id:string;
    url:string;
    width:number;
    height:number;

}

class Cat implements CatType{
    id:string;
    url:string;
    width:number;
    height:number;

    constructor(id:string, url:string, width:number, height:number){
        this.id = id;
        this.url = url;
        this.width = width;
        this.height = height
    }
}

//display data
class DisplayCat {
    //add
    public static addCat(data:CatType):void{
        const cat: Cat = new Cat(data.id,data.url,data.width,data.height)

        //get table
        const table: HTMLTableElement | null = document.querySelector("table")
        const tableRow : HTMLTableRowElement = document.createElement("tr")
        tableRow.innerHTML = `<td>${cat.id}</td>
        <td><img src="${cat.url}"></td>
        <td>${cat.height}</td>
        <td>${cat.width}</td>
        <td>${cat.url}</td>
        <td><a href="#">X</a></td>`
        table?.appendChild(tableRow)
        
//listener of delete
const anchor : HTMLAnchorElement | null = document.querySelector("a")
anchor?.addEventListener<'click'>('click',(ev: MouseEvent) =>DisplayCat.deleteCat(<HTMLAnchorElement>ev.target))
        

    }
    //delete
    public static deleteCat(target: HTMLAnchorElement):void{
        const parentTr = target.parentElement?.parentElement as HTMLTableRowElement
        parentTr?.remove()
    }
}


//get data
async function getData():Promise<void>{
    const catList : CatType[] = await getJson<CatType[]>(dataUrl)
    const cat : CatType = catList[0]
    DisplayCat.addCat(cat);
}




