export class Tree {
    public id: string;
    public name: string;
    public zone: string;
    public ageHeight: string;
    public price: string;
    public description: string;
    public maximum: number;
    public image: File;
    public idTreeCategory: string;

    constructor(id: string, name: string, zone: string, ageHeight: string, price: string, description: string, image: File, idTreeCategory: string, maximum: number) 
    { 
        this.id = id;
        this.name = name;
        this.zone = zone;
        this.ageHeight = ageHeight;
        this.price = price;
        this.description = description;
        this.maximum = maximum;
        this.image = image;
        this.idTreeCategory = idTreeCategory;
    }
}