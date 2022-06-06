import React from 'react';

const Portfolio = () => {
    return (
        <div className='flex flex-col items-center justify-center mt-10 my-5'>
            <h1 className='text-4xl font-extrabold text-purple-600'>Muzakkir Hossain Minhaz</h1>
            <small className='text-lg font-medium text-yellow-600'>minhaz.bauet@gmail.com</small>

            <div class="overflow-x-auto my-5">
                <h1 className='text-start text-xl font-bold'>Education Qualification:</h1>
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Exam Name</th>
                            <th>Institution</th>
                            <th>Board</th>
                            <th>Passing Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>SSC</td>
                            <td>Amjhupi Secondary School</td>
                            <td>Jashore</td>
                            <td>2016</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>HSC</td>
                            <td>Cantonment College, Jashore</td>
                            <td>Jashore</td>
                            <td>2018</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>BSc. in Engineering</td>
                            <td>Bangladesh Army University of Engineering and Technology</td>
                            <td>---</td>
                            <td>2022 (approximately)</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="overflow-x-auto my-5">
                <h1 className='text-start text-xl font-bold'>Skilled as an Web Developer:</h1>
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Topic Name</th>
                            <th>Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>HTML</td>
                            <td>Advance</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>CSS</td>
                            <td>Advance</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>JavaScript</td>
                            <td>Intermediate</td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>React.js</td>
                            <td>Intermediate</td>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td>Node.js/Express.js</td>
                            <td>Beginner</td>
                        </tr>
                        <tr>
                            <th>6</th>
                            <td>MongoDB</td>
                            <td>Beginner</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="overflow-x-auto my-5">
                <h1 className='text-start text-xl font-bold'>My three projects (Live website link):</h1>
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Live Site Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td><a href="https://tour-spots-bd.web.app/" className='text-blue-700'>https://tour-spots-bd.web.app/</a></td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td><a href="https://responsive-calculator-96e870.netlify.app/" className='text-blue-700'>https://responsive-calculator-96e870.netlify.app/</a></td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td><a href="https://simple-landing-page-025749.netlify.app/" className='text-blue-700'>https://simple-landing-page-025749.netlify.app/</a></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Portfolio;