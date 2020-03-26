<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Products;

class ProductsController extends Controller
{
    public function index(){
        return Products::latest()->get();
    }

    public function update(Request $res){
        $product = Products::where('name', $res->product)->first();
        $product->stock_count = (int)$product->stock_count - (int)$res->quantity;
        $updated = $product->save();
        return Products::latest()->get();
    }
}
