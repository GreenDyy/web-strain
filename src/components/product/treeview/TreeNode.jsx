import React, { useState } from 'react';
import './TreeNode.scss';
import { GoChevronDown, GoChevronRight  } from "react-icons/go";

import { GiAbstract010, GiAbstract001, GiAbstract099, GiAbstract107 } from "react-icons/gi";

const TreeNode = ({ node, parents = [], onSelectNode }) => {
    const [isOpen, setIsOpen] = useState(false);
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
                {hasChildren && <span onClick={handleClickShowMore}>{isOpen ? <GoChevronRight className='icon' /> : <GoChevronDown className='icon' />}</span>}
                {/* <p onClick={handleNodeClick}>
                    {node.namePhylum ? `Phylum: ${node.namePhylum}` :
                        node.nameClass ? `Class: ${node.nameClass}` :
                            node.nameGenus ? `Genus: ${node.nameGenus}` :
                                node.nameSpecies ? `Species: ${node.nameSpecies}` :
                                    ''}
                </p> */}
                {node.namePhylum ?
                    <div className='wrap-node' onClick={handleNodeClick}>
                        <GiAbstract001 className='icon-node' />
                        <p>{`Phylum: ${node.namePhylum}`}</p>

                    </div> :
                    node.nameClass ?
                        <div className='wrap-node' onClick={handleNodeClick}>
                            <GiAbstract010 className='icon-node' />
                            <p>{`Class: ${node.nameClass}`}</p>

                        </div> :
                        node.nameGenus ?
                            <div className='wrap-node' onClick={handleNodeClick}>
                                <GiAbstract099 className='icon-node' />
                                <p>{`Genus: ${node.nameGenus}`}</p>

                            </div> :
                            node.nameSpecies ?
                                <div className='wrap-node' onClick={handleNodeClick}>
                                    <GiAbstract107 className='icon-node' />
                                    <p>{`Species: ${node.nameSpecies}`}</p>

                                </div> :
                                ''
                }
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
