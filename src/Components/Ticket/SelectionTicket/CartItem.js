import React, { useState } from 'react'

export default function CartItem({ key, item }) {
    const [counts, setCounts] = useState({});
    // {
    //     0:x,
    //     1:x,
    //     2:x
    // }

    const Up = (countId) => {
        setCounts(prevCounts => ({
            ...prevCounts,
            [countId]: (prevCounts[countId] || 0) + 1 //vị trí mình click giá trị được tăng 1 {0:1}
        }));
    };

    const Down = (countId) => {
        if (counts[countId] > 0) {
            setCounts(prevCounts => ({
                ...prevCounts,
                [countId]: (prevCounts[countId] || 0) - 1
            }));
        }
    };
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <>
            {/* <tr>
            <td>{item.name || item.description}</td>
            <td>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </td>
            <td className='prices'>{item.displayPrice.toLocaleString()}</td>
        </tr>  */}

            <tr>
                <td>
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                    <p>{item.extendedDescription}</p>
                </td>

                <td>
                    <button onClick={() => { Down(key) }} style={{ padding: "5px", fontWeight: "bold", margin: "5px" }}>-</button>
                    <input
                        style={{ width: "40px", textAlign: "center" }}
                        type='number'
                        value={counts[key] || 0}
                        onChange={(e) => {
                            const newValue = parseInt(e.target.value) || 0; //lấy giá trị mới của ô input thông qua e.target.value. Sử dụng parseInt để chuyển giá trị đó thành số nguyên
                            setCounts(prevCounts => ({
                                ...prevCounts,
                                i: newValue
                            })); //cập nhật giá trị của loại vé tương ứng bằng giá trị mới newValue.
                        }}
                    />
                    <button onClick={() => { Up(key) }} style={{ padding: "5px", fontWeight: "bold", margin: "5px" }}>+</button>
                </td>

                <td>{item.displayPrice.toLocaleString()}</td>
                <td>{numberWithCommas((counts[key] || 0) * item.displayPrice)}</td>
            </tr>
        </>
    )
}

