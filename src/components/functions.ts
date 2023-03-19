import axios from "axios";

export interface DataTypes {
    color: string;
    name: string;
    path: string;
    price: number;
    size: string;
    _id:string;
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
export function getColor (color: string | undefined) {
    switch (color) {
        case "Black":
            return "black";
        case "purple":
            return "purple";
        case "gray": 
            return "gray";
        case "white" : 
        return "white";
    }
}
