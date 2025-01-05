import React from "react";

const DetailsComp = (props) => {
    
  const formattedIngredients = Array.isArray(props.ingredients)
    ? props.ingredients.join(", ")
    : "No ingredients available";

  const formattedInstructions = Array.isArray(props.instructions)
    ? props.instructions.join(", ")
    : "No instructions available";

  const formattedTags = Array.isArray(props.tags)
    ? props.tags.join(", ")
    : "No tags available";

    return (
      <div className="left-aligned">
        <div>
         <h2 className="heading">Extra information about the selected row</h2>
         <p>This section will display more details about the selected row in the table.</p>
        </div>
        <div className="detail-item">
          <label >Ingredients:</label>
          <div className="field">{formattedIngredients}</div>
        </div>
        <div className="detail-item">
          <label>Instructions:</label>
          <div className="field">{formattedInstructions }</div>
        </div>
        <div className="detail-item">
          <label>Tags:</label>
          <div className="field">{formattedTags}</div>
        </div>
        <div className="detail-item">
          <label>Review Count:</label>
          <div className="field">{props.reviewCount}</div>
        </div>
        <div className="detail-item">
          <label>Meal Type:</label>
          <div className="field">{props.mealType}</div>
        </div>
        <br></br>
        <button type='button' className="btn btn-primary"  onClick={() => window.location.reload()}>Go back to home-page</button>
      </div>
      );
    }
   
  export default DetailsComp