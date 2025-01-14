import React, {useState} from "react";

const Edit = ({editdata, saveHandler }) => { 

    const formattedIngredients = Array.isArray(editdata.ingredients)
    ? editdata.ingredients.join(", ")
    : "No ingredients available";

  const formattedInstructions = Array.isArray(editdata.instructions)
    ? editdata.instructions.join(", ")
    : "No instructions available";

  const formattedTags = Array.isArray(editdata.tags)
    ? editdata.tags.join(", ")
    : "No tags available";

    const [name, setName] = useState(editdata.name)
    const [ingredients, setIngredients] = useState(formattedIngredients)
    const [instructions, setInstructions] = useState(formattedInstructions)
    const [prepTimeMinutes, setPrepTimeMinutes] = useState(editdata.prepTimeMinutes)
    const [cookTimeMinutes, setCookTimeMinutes] = useState(editdata.cookTimeMinutes)
    const [servings, setServings] = useState(editdata.servings)
    const [difficulty, setDifficulty] = useState(editdata.difficulty)
    const [cuisine, setCuisine] = useState(editdata.cuisine)
    const [caloriesPerServing, setCaloriesPerServing] = useState(editdata.caloriesPerServing)
    const [tags, setTags] = useState(formattedTags)
    const [userId, setUserId] = useState(editdata.userId)
    const [rating, setRating] = useState(editdata.rating)
    const [image, setImage] = useState(editdata.image)
    const [mealType, setMealType] = useState(editdata.mealType)
    const [reviewCount, setReviewCount] = useState(editdata.reviewCount)

    const updatedData = {
        "id": editdata.id,
        "name": name,
        "ingredients": ingredients,
        "instructions": instructions,
        "prepTimeMinutes": prepTimeMinutes,
        "cookTimeMinutes": cookTimeMinutes,
        "servings": servings,
        "difficulty": difficulty,
        "cuisine": cuisine,
        "caloriesPerServing": caloriesPerServing,
        "tags": tags,
        "userId": userId,
        "image": image,
        "rating": rating,
        "reviewCount": reviewCount,
        "mealType": mealType,
    }

    return (
      <div className="edit-save-aligned">
        <div>
          <h2 className="heading">Id# {editdata.id}: All the fields are editable with `Save` and `Cancel` buttons at the bottom </h2>
        </div>
        <br></br>
        <form>
            <div className="form-row">
                <div className="col-md-12 mb-1">
                    <label> name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange = { (e) => setName(e.target.value)}/>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-12 mb-1">
                    <label> ingredients</label>
                    <input type="text" className="form-control" id="ingredients" value={ingredients} onChange = { (e) => setIngredients(e.target.value)}/>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-12 mb-1">
                    <label> instructions</label>
                    <input type="text" className="form-control" id="instructions" value={instructions} onChange = { (e) => setInstructions(e.target.value)}/>
                </div>
            </div>         
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label>prepTimeMinutes</label>
                        <input type="text" className="form-control" id="prepTimeMinutes" value={prepTimeMinutes} onChange = { (e) => setPrepTimeMinutes(e.target.value)} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>cookTimeMinutes</label>
                        <input type="text" className="form-control" id="cookTimeMinutes" value={cookTimeMinutes} onChange = { (e) => setCookTimeMinutes(e.target.value)} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>servings</label>
                        <input type="text" className="form-control" id="servings" value={servings} onChange = { (e) => setServings(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label>difficulty</label>
                        <input type="text" className="form-control" id="difficulty" value={difficulty} onChange = { (e) => setDifficulty(e.target.value)}/>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>cuisine</label>
                        <input type="text" className="form-control" id="cuisine" value={cuisine}  onChange = { (e) => setCuisine(e.target.value)} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>caloriesPerServing</label>
                        <input type="text" className="form-control" id="caloriesPerServing" value={caloriesPerServing} onChange = { (e) => setCaloriesPerServing(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label>tags</label>
                        <input type="text" className="form-control" id="tags" value={tags} onChange = { (e) => setTags(e.target.value)}/>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>userId</label>
                        <input type="text" className="form-control" id="userId" value={userId} onChange = { (e) => setUserId(e.target.value)} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>rating</label>
                        <input type="text" className="form-control" id="rating" value={rating} onChange = { (e) => setRating(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label>image</label>
                        <input type="text" className="form-control" id="image" value={image} onChange = { (e) => setImage(e.target.value)}/>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>mealType</label>
                        <input type="text" className="form-control" id="mealType" value={mealType} onChange = { (e) => setMealType(e.target.value)}/>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>reviewCount</label>
                        <input type="text" className="form-control" id="reviewCount" value={reviewCount} onChange = { (e) => setReviewCount(e.target.value)}/>
                    </div>
                </div>
            </div>
        </form>
        <br></br>
        <div className="container d-flex justify-content-center gap-3" >
            <button type='submit' className="btn btn-primary gap-3"  onClick= { () => saveHandler(updatedData)} >Save</button>
            <button type='button' className="btn btn-warning gap-3"  onClick={() => window.location.reload()}>Cancel</button>
        </div>
      </div>
    );
}

export default Edit;