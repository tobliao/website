// Skills Network Graph using D3.js
class SkillsGraph {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        // Skills data with connections
        this.nodes = [
            // Core skills - larger nodes
            { id: 'UVM', group: 1, size: 25, color: '#ffffff' },
            { id: 'SystemVerilog', group: 1, size: 25, color: '#ffffff' },
            { id: 'Python', group: 2, size: 25, color: '#e5e5e5' },
            { id: 'Docker', group: 3, size: 20, color: '#e5e5e5' },

            // Verification
            { id: 'I2C/I3C', group: 1, size: 15, color: '#ffffff' },
            { id: 'SMBus', group: 1, size: 15, color: '#ffffff' },
            { id: 'ASIC', group: 1, size: 18, color: '#ffffff' },
            { id: 'Ethernet', group: 1, size: 18, color: '#ffffff' },

            // Programming & Tools
            { id: 'JavaScript', group: 2, size: 18, color: '#e5e5e5' },
            { id: 'Shell Script', group: 2, size: 18, color: '#e5e5e5' },
            { id: 'Perl', group: 2, size: 12, color: '#cccccc' },
            { id: 'PHP', group: 2, size: 12, color: '#cccccc' },

            // Web & Data
            { id: 'D3.js', group: 2, size: 15, color: '#d0d0d0' },
            { id: 'HTML/CSS', group: 2, size: 12, color: '#cccccc' },
            { id: 'Ionic', group: 2, size: 12, color: '#cccccc' },

            // Infrastructure
            { id: 'Microservices', group: 3, size: 18, color: '#e5e5e5' },
            { id: 'CI/CD', group: 3, size: 15, color: '#d0d0d0' },
            { id: 'Apache', group: 3, size: 12, color: '#cccccc' },
            { id: 'nginx', group: 3, size: 12, color: '#cccccc' },

            // Networking
            { id: 'SDN', group: 4, size: 15, color: '#d0d0d0' },
            { id: 'WireShark', group: 4, size: 12, color: '#cccccc' },
            { id: 'Socket', group: 4, size: 12, color: '#cccccc' },

            // ML & Data
            { id: 'ML', group: 5, size: 18, color: '#d0d0d0' },
            { id: 'scikit-learn', group: 5, size: 12, color: '#cccccc' },
            { id: 'flask', group: 5, size: 12, color: '#cccccc' },

            // Python libs
            { id: 'pymongo', group: 5, size: 10, color: '#b0b0b0' },
            { id: 'ZMQ', group: 5, size: 10, color: '#b0b0b0' },
        ];

        this.links = [
            // UVM connections
            { source: 'UVM', target: 'SystemVerilog', strength: 2 },
            { source: 'UVM', target: 'I2C/I3C', strength: 1.5 },
            { source: 'UVM', target: 'SMBus', strength: 1.5 },
            { source: 'UVM', target: 'Ethernet', strength: 1.5 },
            { source: 'UVM', target: 'ASIC', strength: 1.5 },

            // SystemVerilog connections
            { source: 'SystemVerilog', target: 'ASIC', strength: 1.5 },
            { source: 'SystemVerilog', target: 'I2C/I3C', strength: 1 },
            { source: 'SystemVerilog', target: 'SMBus', strength: 1 },

            // Python connections
            { source: 'Python', target: 'ML', strength: 2 },
            { source: 'Python', target: 'scikit-learn', strength: 1.5 },
            { source: 'Python', target: 'flask', strength: 1.5 },
            { source: 'Python', target: 'pymongo', strength: 1 },
            { source: 'Python', target: 'ZMQ', strength: 1 },
            { source: 'Python', target: 'Shell Script', strength: 1 },

            // Web connections
            { source: 'JavaScript', target: 'D3.js', strength: 1.5 },
            { source: 'JavaScript', target: 'HTML/CSS', strength: 1.5 },
            { source: 'JavaScript', target: 'Ionic', strength: 1 },
            { source: 'D3.js', target: 'HTML/CSS', strength: 1 },

            // Infrastructure connections
            { source: 'Docker', target: 'Microservices', strength: 2 },
            { source: 'Docker', target: 'CI/CD', strength: 1.5 },
            { source: 'Microservices', target: 'Python', strength: 1 },
            { source: 'Microservices', target: 'nginx', strength: 1 },
            { source: 'Microservices', target: 'Apache', strength: 1 },

            // Networking connections
            { source: 'SDN', target: 'Python', strength: 1 },
            { source: 'WireShark', target: 'Socket', strength: 1 },
            { source: 'Ethernet', target: 'SDN', strength: 1 },

            // Cross-domain connections
            { source: 'Python', target: 'JavaScript', strength: 0.5 },
            { source: 'Shell Script', target: 'Docker', strength: 1 },
            { source: 'Perl', target: 'SystemVerilog', strength: 0.5 },
            { source: 'PHP', target: 'JavaScript', strength: 0.8 },
        ];

        this.init();
    }

    init() {
        // Create SVG
        this.svg = d3.select(this.container)
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);

        // Create force simulation
        this.simulation = d3.forceSimulation(this.nodes)
            .force('link', d3.forceLink(this.links)
                .id(d => d.id)
                .distance(d => 100 / d.strength)
                .strength(d => d.strength * 0.3))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide().radius(d => d.size + 10));

        // Create links
        this.link = this.svg.append('g')
            .selectAll('line')
            .data(this.links)
            .enter()
            .append('line')
            .attr('stroke', '#ffffff')
            .attr('stroke-opacity', d => 0.1 + d.strength * 0.15)
            .attr('stroke-width', d => d.strength * 0.8);

        // Create nodes
        this.node = this.svg.append('g')
            .selectAll('g')
            .data(this.nodes)
            .enter()
            .append('g')
            .call(d3.drag()
                .on('start', (event, d) => this.dragStarted(event, d))
                .on('drag', (event, d) => this.dragged(event, d))
                .on('end', (event, d) => this.dragEnded(event, d)));

        // Add circles to nodes
        this.node.append('circle')
            .attr('r', d => d.size)
            .attr('fill', d => d.color)
            .attr('stroke', '#fff')
            .attr('stroke-width', 1)
            .style('filter', 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))');

        // Add labels to nodes
        this.node.append('text')
            .text(d => d.id)
            .attr('x', 0)
            .attr('y', d => d.size + 15)
            .attr('text-anchor', 'middle')
            .attr('fill', '#fff')
            .style('font-size', '11px')
            .style('font-weight', 'bold')
            .style('pointer-events', 'none')
            .style('text-shadow', '0 0 5px rgba(0, 0, 0, 0.8)');

        // Add hover effects
        this.node
            .on('mouseover', (event, d) => this.highlightNode(d))
            .on('mouseout', () => this.resetHighlight());

        // Update positions on tick
        this.simulation.on('tick', () => {
            this.link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            this.node
                .attr('transform', d => `translate(${d.x},${d.y})`);
        });

        // Handle window resize
        window.addEventListener('resize', () => this.resize());
    }

    dragStarted(event, d) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    dragEnded(event, d) {
        if (!event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    highlightNode(targetNode) {
        // Dim all nodes and links
        this.node.selectAll('circle')
            .style('opacity', 0.2);
        this.link
            .style('opacity', 0.1);

        // Highlight selected node
        this.node.filter(d => d.id === targetNode.id)
            .selectAll('circle')
            .style('opacity', 1);

        // Highlight connected nodes and links
        const connectedNodeIds = new Set([targetNode.id]);
        this.links.forEach(link => {
            if (link.source.id === targetNode.id) {
                connectedNodeIds.add(link.target.id);
            } else if (link.target.id === targetNode.id) {
                connectedNodeIds.add(link.source.id);
            }
        });

        this.node.filter(d => connectedNodeIds.has(d.id))
            .selectAll('circle')
            .style('opacity', 1);

        this.link.filter(d =>
            (d.source.id === targetNode.id || d.target.id === targetNode.id))
            .style('opacity', 0.8);
    }

    resetHighlight() {
        this.node.selectAll('circle')
            .style('opacity', 1);
        this.link
            .style('opacity', d => 0.2 + d.strength * 0.2);
    }

    resize() {
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.svg
            .attr('width', this.width)
            .attr('height', this.height);

        this.simulation
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .alpha(0.3)
            .restart();
    }
}

// Initialize when D3 is loaded
function initSkillsGraph() {
    if (typeof d3 !== 'undefined') {
        new SkillsGraph('skills-graph');
    } else {
        setTimeout(initSkillsGraph, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkillsGraph);
} else {
    initSkillsGraph();
}
