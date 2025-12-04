import {model,Schema} from 'mongoose';

const movieSchema=new Schema({
    title:{type:String},
    description:{type:String},
    images:{type:[String]},
    director:{type:String},
    year:{type:Number},
    genre:{type:[String]},
    cast:{type:[String]},
    rating:{type:Number},
    duration:{type:String},
});

const Movie = model('Movie',movieSchema);

export default Movie;

