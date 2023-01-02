# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
# b = Book.all
# if (b.length <= 0) 
    # b = Book.create!(name: "John", content: "test", author: "John")
    # b1 = Book.create!(name: "Mark Dwene", content: "Hello", author: "Dwayne", slug: "Mark Dwene", published: "true", price: 5000);
    # b2 = Book.create!(name: "Brandon Fin", content: "Dark Knight", author: "Varenica", slug: "Brandon Fin", published: "true", price: 8000);
# end
# d = Documentary.all
# if (d.length <= 0)
    # d = Documentary.create!(documentary_name: 'Star Wars', book_name: 'Ahmedabad Days', slug: 'Ahmedabad Days', views: 20, price: 500, book_id: b.id)
    # d1 = Documentary.create!(documentary_name: 'Lord of the Rings',slug: 'Lord of the Rings',book_name: 'Dolittle',views: 120, price: 1200,book_id: b1.id)
    # d2 = Documentary.create!(documentary_name: 'Snyder Cut',slug: 'Snyder Cut',book_name: 'Brandon Fin',views: 40, price: 120,book_id: b2.id)
    d3 = Documentary.create!(documentary_name: 'Pirates of Carabbian',slug: 'Pirates of Carabbian',book_name: 'Brandon Fin',views: 100, price: 760,book_id: 2)
# end
