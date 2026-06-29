# PRD - chatGraph-FE-local

## 1. Product Name & Summary
**chatGraph-FE-local** is an interactive web frontend built to explore, manage, and visualize conversational data (topics) using a graph-based interface paired with a standard dialogue view.

## 2. Product Goals & Vision
- To provide a seamless way to navigate complex conversational threads or topic branches.
- To offer an intuitive "Graph View" for visualizing the hierarchical relationships among questions/nodes.
- To offer a standard "Chat View" for deep-diving into the linear context of specific topic nodes.

## 3. Target Audience
- Data analysts, researchers, or administrators who need to review layered and branching conversations.
- Users looking for a structured way to interact with conversational topics that deviate from linear chat models.

## 4. Key Features

### 4.1 Topic Exploration (Graph View)
- Visualize conversational node structures using D3.js.
- Traverse through the question tree visually.
- Support switching between Graph View and Chat Mode contextually.

### 4.2 Interactive Chat Dialog (Chat View)
- A linear representation of the current path within the question tree.
- `OptimisticChatView`: Seamless UI updates for adding new questions before server confirmation.
- Read and interact with specific nodes in the conversational flow.

### 4.3 Workspace & Navigation
- Context-aware sidebar for jumping between top-level topics or past sessions.
- Share capabilities to distribute specific conversational paths.
- Authentication integration (Login/Register) for personalizing topic history.

## 5. Non-Functional Requirements
- **Performance**: High reactivity using Zustand and React Query. The D3 visualization must render smoothly for complex trees.
- **Scalability**: Frontend architecture strictly follows Feature-Sliced Design to allow isolated upgrades of the visualization or chat features independently.
- **Design System**: Fully leverages Tailwind CSS 4 and Radix UI headless components for accessible, lightweight styling.

## 6. Success Metrics (KPIs)
- **Engagement**: Time spent switching between linear chat and graph view.
- **Performance**: Initial load time and graph render performance (`< 1.5s` LCP).
- **Usability**: Low friction in adding new nodes to the topic tree.
