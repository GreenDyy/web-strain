import React, { useState } from 'react';
import './TreeNode.scss';
import { AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";

const TreeNode = ({ node, parents = [], onSelectNode }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedNode, setSelectedNode] = useState(null);


    const hasChildren = node.classes || node.genus || node.species;

    const handleClickShowMore = () => {
        setIsOpen(!isOpen);
    };

    const handleNodeClick = () => {
        onSelectNode(node);
    };

    return (
        <li className="tree-node">
            <div className={`tree-node-label ${isOpen ? 'open' : ''}`}>
                {hasChildren && <span onClick={handleClickShowMore}>{isOpen ? <AiOutlineCaretDown className='icon' /> : <AiOutlineCaretRight />}</span>}
                <p onClick={handleNodeClick}>
                    {node.namePhylum ? `Phylum: ${node.namePhylum}` :
                        node.nameClass ? `Class: ${node.nameClass}` :
                            node.nameGenus ? `Genus: ${node.nameGenus}` :
                                node.nameSpecies ? `Species: ${node.nameSpecies}` :
                                    ''}
                </p>
            </div>
            {hasChildren && isOpen && (
                <ul className="tree-node-children">
                    {node.classes && node.classes.map((childNode) => (
                        <TreeNode
                            key={childNode.idClass}
                            node={childNode}
                            parents={[...parents, node]}
                            onSelectNode={onSelectNode}
                        />
                    ))}
                    {node.genus && node.genus.map((childNode) => (
                        <TreeNode
                            key={childNode.idGenus}
                            node={childNode}
                            parents={[...parents, node]}
                            onSelectNode={onSelectNode}
                        />
                    ))}
                    {node.species && node.species.map((childNode) => (
                        <TreeNode
                            key={childNode.idSpecies}
                            node={childNode}
                            parents={[...parents, node]}
                            onSelectNode={onSelectNode}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default TreeNode;
