import React from 'react';
import TreeNode from './TreeNode';
import './TreeView.scss'; 

const TreeView = ({ data, onSelectNode }) => {
    return (
        <ul className='tree'>
            {data.map((node) => (
                <TreeNode key={node.idPhylum} node={node} onSelectNode={onSelectNode} />
            ))}
        </ul>
    );  
};

export default TreeView;
