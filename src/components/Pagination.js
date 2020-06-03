import React from 'react'

const Pagination = (props) => {
    const pageNumbers = [];

    for(let i = 1; i <=Math.ceil(props.totalPosts / props.postsPerPage); i++){
        pageNumbers.push(i);
    }



    return (
            <ul className="pagination">
            <li className="disabled"><a><i className="material-icons">chevron_left</i></a></li>

                {pageNumbers.map(number => (
                    
                    <li key={number} className="waves-effect">
                        <a  onClick={(e) => props.paginate(number)}>
                            {number}
                        </a>
                     </li>
                ))}
                <li className="waves-effect"><a><i className="material-icons">chevron_right</i></a></li>

            </ul>
            

    );
}

export default Pagination;
