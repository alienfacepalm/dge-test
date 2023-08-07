import * as data from "./data.json";

interface Filter {
  property: string;
  value: number;
  operator: string;
}

interface Action {
  id: string;
  nextActionId: string | null;
  actionType: string;
  parentBranchId: string | null;
}

interface Branch {
  id: string;
  parentBranchId: string | null;
  name: string;
  position: number;
  filters: Filter[];
}

class TreeNode {
  id: string;
  children: TreeNode[];

  constructor(id: string, children: TreeNode[] = []) {
    this.id = id;
    this.children = children;
  }
}

class ActionNode extends TreeNode {
  action: Action;

  constructor(action: Action) {
    super(action.id);
    this.action = action;
  }
}

class BranchNode extends TreeNode {
  branch: Branch;

  constructor(branch: Branch) {
    super(branch.id);
    this.branch = branch;
  }
}

function buildTree(
  actions: Record<string, Action>,
  branches: Record<string, Branch>
): TreeNode[] {
  const nodes: Record<string, TreeNode> = {};

  // Create action nodes
  for (const actionId in actions) {
    const action = actions[actionId];
    nodes[actionId] = new ActionNode(action);
  }

  // Create branch nodes
  for (const branchId in branches) {
    const branch = branches[branchId];
    nodes[branchId] = new BranchNode(branch);
  }

  // Link nodes
  for (const actionId in actions) {
    const action = actions[actionId];
    const node = nodes[actionId];
    const nextActionId = action.nextActionId;
    if (nextActionId && nodes[nextActionId]) {
      node.children.push(nodes[nextActionId]);
    }
    if (action.parentBranchId && nodes[action.parentBranchId]) {
      nodes[action.parentBranchId].children.push(node);
    }
  }

  const root: TreeNode[] = [];
  for (const nodeId in nodes) {
    const node = nodes[nodeId];
    if (!node.children.length) {
      root.push(node);
    }
  }

  return root;
}

const tree = buildTree(data.actions, data.branches);

console.log(JSON.stringify(tree, null, 2));
