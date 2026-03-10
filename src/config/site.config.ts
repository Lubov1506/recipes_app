export const siteConfig = {
  title: "Pizza",
  description: "Create your pizza",
  navItems: [
    { href: "/", label: "Recipes" },
    { href: "/ingredients", label: "Ingredients" },
    { href: "/about", label: "About" },
  ],
  pagesContent: {
    "/": {
      content: ` <p>We adhere to the golden standards of Italian cuisine to ensure you get exactly the taste you expect.</p>

<ul>
    <li>
        <strong>Margherita:</strong> 
        San Marzano tomato base, fresh fior di latte mozzarella, basil leaves, and a drizzle of Extra Virgin olive oil.
    </li>
    <li>
        <strong>Capricciosa:</strong> 
        Tomato sauce, mozzarella, baked ham, mushrooms, artichokes, and black olives.
    </li>
    <li>
        <strong>Diavola:</strong> 
        A spicy combination of tomato sauce, mozzarella, and hot salami picante, topped with chili flakes.
    </li>
    <li>
        <strong>Quattro Formaggi:</strong> 
        White base (cream or mozzarella), rich gorgonzola, tender edam, and grated parmesan.
    </li>
    <li>
        <strong>Hawaiian:</strong> 
        A tropical mix of tender chicken fillet, juicy pineapples, mozzarella, and sweet corn.
    </li>
</ul>

<p>Each pizza is prepared individually for your order within 10-15 minutes.</p>`,
    },
    "/about": {
      content: `   

    <p>We are constantly experimenting, so in our menu, you will find both timeless classics and exciting new arrivals:</p>
<br/>
    <ul>
        <li><strong>Margherita</strong> — a timeless classic with juicy tomatoes and fresh mozzarella.</li>
        <li><strong>Pepperoni</strong> — a spicy pizza for those who appreciate zesty sausages.</li>
        <li><strong>Four Cheese</strong> — a delicate blend of gorgonzola, parmesan, mozzarella, and edam.</li>
        <li><strong>Quattro Stagioni</strong> — four flavors in one pizza for those who want it all at once.</li>
        <li><strong>BBQ Chicken</strong> — a flavorful pizza with barbecue sauce and tender chicken breast.</li>
    </ul>
<br/>

    <p>Visit us for a cozy atmosphere or order delivery straight to your door!</p>
`,
    },
    "/ingredients": {
      content: `  <p>Here is what makes our pizza special:</p>

<ul>
    <li><strong>Flour:</strong> We use Italian soft wheat flour type "00," which makes the dough elastic and airy.</li>
    <li><strong>Cheese:</strong> Only real 100% Mozzarella, which stretches perfectly and has a delicate creamy taste.</li>
    <li><strong>Tomato Sauce:</strong> Homemade from selected San Marzano tomatoes with added basil and sea salt.</li>
    <li><strong>Toppings:</strong> Fresh vegetables, Italian deli meats, and Extra Virgin olive oil.</li>
</ul>`,
    },
  },
}
