import axios from "axios";

export interface DataTypes {
    color: string;
    name: string;
    path: string;
    price: number;
    size: string;
    _id:string;
    date: Date;
    category: string;
    style: string;
    sale:number;
    collections:string;
    storage:number;
    gender:string;
  }

export const getClothingModels = async ({setData}: {setData:React.Dispatch<React.SetStateAction<DataTypes[]>>}) => {
    const res = await axios.get("http://localhost:5001/clothing", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === 400) {
      console.log("error");
    } else {
      setData(res.data.getClothingModel);
    }
  };


export const getNewAddedClothes = async ({setNewAdded}: {setNewAdded: React.Dispatch<React.SetStateAction<DataTypes[]>>}) => {
    const res = await axios.get("http://localhost:5001/clothing", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === 400) {
      console.log("error");
    } else {
      setNewAdded(res.data.getClothingModel.reverse());
    }
  };



export interface NavBarTypes {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  login:boolean;
}
export function handleDiscount(item: DataTypes) {
  let discount = (item.price * item.sale) / 100;
  return  item.price - discount;
}
export const categoriesArray = ["Suits", "T-Shirt"];
export const brandArray = ["Classic", "Urban"];
export const sizeArray = ["S", "M", "L"];
export const colorArray = ["Black", "White", "Gray", "Pink", "Purple"];