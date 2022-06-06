import React from 'react';

const Blogs = () => {
    return (
        <div className='my-7 text-lg text-justify w-full px-5 lg:px-0'>
            <div className=''>
                <h2 className='text-3xl font-bold mb-3'>1. How will you improve the performance of a React Application?</h2>
                <p className='ml-8'>Using React in application brings better performance and minimizes the number of DOM operations used to build faster user interfaces as it was built keeping performance in mind. Several clever and performance optimization techniques are used in React internally to minimize the number of costly DOM operations required to update the UI. This generally leads to a faster UI without specifically optimizing for performance for many cases, and there are ways where we can still speed up our React application.</p>
                <ol className="list-decimal ml-16">
                    <li>Use a Production build before deployment</li>
                    <li>Avoid Adding Extra Nodes to the DOM by using React.Fragment</li>
                    <li>Avoid Anonymous Functions</li>
                    <li>App’s loading time improvement by lazy loading</li>
                    <li>Immutable Data Structures</li>
                </ol>
                <p className='ml-8'>Although the React applications boost performance, the virtual DOM and React ecosystem is vast and powerful. We can still leverage numerous tools or techniques available to us to build huge complex applications with outstanding performance.</p>
            </div>
            <div className='mt-7'>
                <h2 className='text-3xl font-bold mb-3'>2. What are the different ways to manage a state in a React application?</h2>
                <p className='ml-8'>There are four main types of state you need to properly manage in your React apps:</p>
                <ol className="list-decimal ml-16">
                    <li>Local State</li>
                    <li>Global State</li>
                    <li>Server State</li>
                    <li>URL State</li>
                </ol>
                <h3 className='text-xl font-medium ml-8 mt-3'>Manage States are:</h3>
                <div className='ml-16 my-4'>
                    <p><strong>Local State: </strong>Local state is data we manage in one or another component. Local state is perhaps the easiest kind of state to manage in React, <span className='bg-slate-200 font-mono px-3 rounded-md'>useState</span> is the first tool you should reach for to manage state in your components. It can take accept any valid data value, including primitive and object values. <span className='bg-slate-200 font-mono px-3 rounded-md'>useReducer</span> is another option that can be used for either local or global state. It is similar in many ways to <span className='bg-slate-200 font-mono px-3 rounded-md'>useState</span> under the hood, although instead of just an initial state it accepts a reducer.The benefit of <span className='bg-slate-200 font-mono px-3 rounded-md'>useReducer</span> is that it provides a built-in way to perform a number of different state operations with the help of the reducer function, which makes it more dynamic overall than <span className='bg-slate-200 font-mono px-3 rounded-md'>useState</span>.</p>
                </div>
                <div className='ml-16 my-4'>
                    <p><strong>Global State: </strong>Global state is data we manage across multiple components.</p>
                </div>
                <div className='ml-16 my-4'>
                    <p><strong>Server State: </strong>Data that comes from an external server that must be integrated with our UI state. Server state can be deceptively challenging to manage. At first, it seems you just need to fetch data and display it in the page. But then you need to display a loading spinner while you are waiting for the data. Then you need to handle errors and display them to the user as they arise. <br /> What happens when there is a network error? Do I really need to hit my server every time my user visits the home page if the data hasn’t changed? Do I need to add useState and useEffect in every component I want to fetch my data?<br /> To fix this, there are a couple of great libraries that make data fetching in React a breeze: <strong>SWR</strong> and <strong>React Query</strong>.</p>
                </div>
                <div className='ml-16 my-4'>
                    <p><strong>URL State: </strong>Data that exists on our URLs, including the pathname and query parameters. To end a difficult topic on a positive note, URL state is largely already managed for you if you are using a framework like Next.js or the current version of React Router. URL state is quite easy to manage, usually through custom hooks that give us all the information we need about our location, history, and pathname. If you are using React Router, you can get all the information you need using <span className='bg-slate-200 font-mono px-3 rounded-md'>useHistory</span> or <span className='bg-slate-200 font-mono px-3 rounded-md'>useLocation</span>.

                    </p>
                </div>
            </div>
            <div className=''>
                <h2 className='text-3xl font-bold mb-3'>3. How does prototypical inheritance work?</h2>
                <p className='ml-8'>Every object with its methods and properties contains an internal and hidden property known as <strong>[[Prototype]]</strong>. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using <strong>__proto__</strong>.</p>

                <div className="text-lg font-bold ml-8 mt-3">Syntax:</div>
                <div className="mockup-code lg:w-1/3 ml-8">
                    <pre><code>ChildObject.__proto__ = ParentObject</code></pre>
                </div>
            </div>
            <div className='mt-8'>
                <h2 className='text-3xl font-bold mb-3'>4. Why you do not set the state directly in React. For example, if you have <span className='bg-slate-200 font-mono px-3 rounded-md'>const [products, setProducts] = useState([])</span>. Why you do not set <span className='bg-slate-200 font-mono px-3 rounded-md'>products = [...]</span> instead, you use the <span className='bg-slate-200 font-mono px-3 rounded-md'>setProducts</span></h2>
                <p className='ml-8'>One should never update the state directly because of the following reasons:</p>
                <ol className="list-decimal ml-16">
                    <li>If you update it directly, calling the <span className='bg-slate-200 font-mono px-3 rounded-md'>setState()</span> afterward may just replace the update you made.</li>
                    <li>When you directly update the state, it does not change this.state immediately. Instead, it creates a pending state transition, and accessing it after calling this method will only return the present value.</li>
                    <li>When you directly update the state, it does not change this.state immediately. Instead, it creates a pending state transition, and accessing it after calling this method will only return the present value.</li>
                </ol>
            </div>
            <div className='mt-8'>
                <h2 className='text-3xl font-bold mb-3'>5. You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h2>
                <p className='ml-8'>I implement a search to find products by name using <span className='bg-slate-200 font-mono px-3 rounded-md'>includes()</span> method. The <span className='bg-slate-200 font-mono px-3 rounded-md'>includes()</span> method determines whether an array includes a certain value and returns true or false as appropriate.</p>

                <div className="text-lg font-bold ml-8 mt-3">Example:</div>
                <div className="mockup-code lg:w-1/3 ml-8 h-40">
                    <pre>
                        const products = [
                        {'{'}
                        name: 'iPhone 13 Pro',
                        price: 700$,
                        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ut quam laudantium veniam! Temporibus, quas.'
                        {'}'},
                        {'{'}
                        name: 'iPhone 5s',
                        price: 450$,
                        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ut quam laudantium veniam! Temporibus, quas.'
                        {'}'},
                        {'{'}
                        name: 'iPhone 9 Pro Max',
                        price: 625$,
                        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ut quam laudantium veniam! Temporibus, quas.'
                        {'}'},
                        ]
                    </pre>
                    <pre>
                        products.map(p {'=>'} if(p.name.includes(searchText)));
                    </pre>
                </div>
            </div>

            <div className='mt-8'>
                <h2 className='text-3xl font-bold mb-3'>6. What is a unit test? Why should write unit tests?</h2>
                <p className='ml-8'><strong>UNIT TESTING</strong> is a type of software testing where individual units or components of a software are tested. The purpose is to validate that each unit of the software code performs as expected. Unit Testing is done during the development (coding phase) of an application by the developers. Unit Tests isolate a section of code and verify its correctness. A unit may be an individual function, method, procedure, module, or object.</p>
                <p className='ml-8 mt-2'>Unit Testing is important because software developers sometimes try saving time doing minimal unit testing and this is myth because inappropriate unit testing leads to high cost Defect fixing during System Testing, Integration Testing and even Beta Testing after application is built. If proper unit testing is done in early development, then it saves time and money in the end.</p>
                <p className='ml-8 mt-2'>Here, are the key reasons to perform unit testing:</p>
                <ol className="list-decimal ml-16">
                    <li>Unit tests help to fix bugs early in the development cycle and save costs.</li>
                    <li>It helps the developers to understand the testing code base and enables them to make changes quickly
                    </li>
                    <li>Good unit tests serve as project documentation</li>
                    <li>Unit tests help with code re-use. Migrate both your code and your tests to your new project. Tweak the code until the tests run again.</li>
                </ol>
            </div>
        </div>
    );
};

export default Blogs;