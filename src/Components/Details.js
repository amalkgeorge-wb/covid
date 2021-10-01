function Details(params) {
    console.log(params)
    return(
        <div className="details-heading">
            <h1>Selected Hospital</h1>
           <p>{params.selectedItem.name}</p> 
           <p>{params.selectedItem.address}</p>
            <p>{params.selectedItem.district_name}</p>
            <p>{params.selectedItem.pincode}</p>
        </div>
    )
}
export default Details;