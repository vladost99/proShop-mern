import React, {useState} from "react";

export default function(initialValue) {
     const [value, setValue] = useState(initialValue);

     const hanlder = (e) => {
         setValue(e.target.value);
     }

     const hanlderCheck = (e) => {
         setValue(e.target.checked);
     }



     return {
         value, 
         hanlder,
         setValue,
         hanlderCheck
     }
}