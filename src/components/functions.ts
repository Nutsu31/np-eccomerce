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
  export interface CartType {
    img: string;
    name: string;
    size:string;
    quantity: string;
    price: number;
    sale: number;
    id: string
    path:string
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
  setDark: React.Dispatch<React.SetStateAction<boolean>>;

  dark:boolean;
  login:boolean;
}
export function handleDiscount(item: DataTypes | CartType) {
  if(item.sale){
    let discount = (item.price * item.sale) / 100;
    return  +item.price - discount;
  }else{
    return +item.price
  }
}
export const categoriesArray = ["Suits", "T-Shirt"];
export const brandArray = ["Classic", "Urban"];
export const sizeArray = ["S", "M", "L"];
export const colorArray = ["Black", "White", "Gray", "Pink", "Purple"];


export function getName (color:string | undefined) {
  switch (color){
    case "Black":
      return "შავი";
    case "White":
      return "თეთრი";
    case "Gray":
      return "ნაცრისფერი";
    case "Purple":
      return "იასამნისფერი";
    case "Blue":
      return "ლურჯი";
    case "Green":
      return "მწვანე";
  }
}

export function getItemsFromLocalStorage ({setCartItem}:{setCartItem: React.Dispatch<React.SetStateAction<CartType[]>>}){
  const item = JSON.parse(localStorage.getItem("key")!)
  if(item == null){
    return
  }else{

    setCartItem(item)
  }
} 

interface getTotalPriceType {
  cartItem: Array<CartType>,
  setTotalPrice:React.Dispatch<React.SetStateAction<number>>
}

export function getTotalPrice ({cartItem, setTotalPrice}:getTotalPriceType){
    const total = 0;
  const calculatePrice = cartItem.map(
    (i: CartType) => total + Number(handleDiscount(i)) * Number(i.quantity)
  );
  const sum = calculatePrice.reduce(
    (acc: number, cur: number) => acc + cur,
    0
  );
  setTotalPrice(sum);
}

interface GetTotalSaleType {
  cartItem:Array<CartType>,
  totalPrice:number,
  setTotalSale:React.Dispatch<React.SetStateAction<number>>
}
export function getTotalSale ({cartItem,  setTotalSale}:GetTotalSaleType){


  const calculateSale = cartItem.map((item:CartType) => {
    if(item.sale){
      return item.price * item.sale / 100
    }else {
      return 0
    }
  })  
  const sum2 = calculateSale.reduce(
    (acc: number, cur: number) => acc + cur,
    0
    );
  setTotalSale(sum2)

}
interface HandleDeleteType {
  id:string,
  cartItem:Array<CartType>,
  setCartItem:React.Dispatch<React.SetStateAction<CartType[]>>
}

export function handleDelete ({id,cartItem,setCartItem}:HandleDeleteType) {
  const newCartItem = cartItem?.filter((item) => item.id !== id);
  localStorage.setItem("key", JSON.stringify(newCartItem));
  setCartItem(newCartItem);
}


// get checkouts form database

export interface CheckoutsType {
  firstname: string;
  lastname: string;
  _id:string,
  model: [
    {
      img: string;
      id: string;
      name: string;
      price: number;
      quantity: number;
      sale: number;
      size: string;
      path:string;
    }
  ];
  phone: string;
  alt_phone: string;
  city: string;
  street: string;
  postalCode: string;
  status: string;
  totalPrice: number;
}
export async function getCheckouts ({setCheckout}:{setCheckout:React.Dispatch<React.SetStateAction<CheckoutsType[] | undefined>>}) {
  const res = await axios.get("http://localhost:5001/checkout", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === 400) {
      console.log("error");
    } else {
      setCheckout(res.data.getCheckoutData);
    }
}
export async function orderTracker ({setOrder,pathname}:{pathname:string,setOrder:React.Dispatch<React.SetStateAction<CheckoutsType[] | undefined>>}) {
  const res = await axios.get(`http://localhost:5001/tracker`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === 400) {
      console.log("error");
    } else {
      setOrder(res.data.orderData);
    }
}

export function getStatusColor(status: string) {
  if (status === "inProgress") {
    return "yellow";
  } else if (status === "shipped") {
    return "lightgreen";
  } else if (status === "delivered") {
    return "green";
  } else {
    return "red";
  }
}

export interface OrderStatusType {
  id?: string;
  status?: string;
  models?: [
    {
      img: string;
      id: string;
      name: string;
      price: number;
      quantity: number;
      sale: number;
      size: string;
      path: string;
    }
  ];
}
export async function updateCheckoutStatus({
    orderStatus,
    setShouldUpdate
}:{
  orderStatus: OrderStatusType | undefined,
  setShouldUpdate:React.Dispatch<React.SetStateAction<boolean>>
}
) {
  if(orderStatus === undefined){
    return
  }else{
    axios({
      method: "PUT",
      url: "http://localhost:5001/checkout",
      headers: { "Content-Type": "application/json" },
      data: {
        id: orderStatus?.id,
        status: orderStatus?.status,
        models: orderStatus?.models,
      },
    })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }
}