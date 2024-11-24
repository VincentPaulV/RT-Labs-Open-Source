import { NextRequest, NextResponse } from "next/server";
import { getSingleProject } from "@/sanity/sanity.query";

const backendURL = "https://cd90-2401-4900-62fa-8c09-1d61-6bf7-1c33-7087.ngrok-free.app"

// Sample data as fallback
const sampleData = [
  {"ax": -0.32, "time_ms": 2}, {"ax": -0.36, "time_ms": 13}, {"ax": -0.3, "time_ms": 24}, 
    {"ax": -0.34, "time_ms": 35}, {"ax": -0.32, "time_ms": 46}, {"ax": -0.33, "time_ms": 57}, 
    {"ax": -0.3, "time_ms": 68}, {"ax": -0.33, "time_ms": 79}, {"ax": -0.32, "time_ms": 90}, 
    {"ax": -0.32, "time_ms": 101}, {"ax": -2.0, "time_ms": 112}, {"ax": -0.49, "time_ms": 123}, 
    {"ax": 0.09, "time_ms": 134}, {"ax": -0.4, "time_ms": 145}, {"ax": -0.2, "time_ms": 156}, 
    {"ax": 0.29, "time_ms": 167}, {"ax": 0.3, "time_ms": 178}, {"ax": 0.19, "time_ms": 189}, 
    {"ax": -0.12, "time_ms": 200}, {"ax": -0.26, "time_ms": 211}, {"ax": -0.23, "time_ms": 222}, 
    {"ax": -0.4, "time_ms": 233}, {"ax": -0.33, "time_ms": 244}, {"ax": -0.21, "time_ms": 255}, 
    {"ax": -0.58, "time_ms": 266}, {"ax": -0.23, "time_ms": 277}, {"ax": -0.28, "time_ms": 288}, 
    {"ax": -0.49, "time_ms": 299}, {"ax": -0.51, "time_ms": 310}, {"ax": -0.6, "time_ms": 321}, 
    {"ax": -0.68, "time_ms": 332}, {"ax": -0.67, "time_ms": 343}, {"ax": -0.67, "time_ms": 354}, 
    {"ax": -0.64, "time_ms": 365}, {"ax": -0.51, "time_ms": 376}, {"ax": -0.44, "time_ms": 387}, 
    {"ax": -0.41, "time_ms": 397}, {"ax": -0.39, "time_ms": 408}, {"ax": -0.33, "time_ms": 419}, 
    {"ax": -0.31, "time_ms": 430}, {"ax": -0.09, "time_ms": 441}, {"ax": -0.45, "time_ms": 452}, 
    {"ax": -0.28, "time_ms": 463}, {"ax": -0.3, "time_ms": 474}, {"ax": -0.21, "time_ms": 485}, 
    {"ax": -0.25, "time_ms": 496}, {"ax": -0.27, "time_ms": 507}, {"ax": -0.29, "time_ms": 518}, 
    {"ax": -0.21, "time_ms": 529}, {"ax": -0.25, "time_ms": 540}, {"ax": -0.23, "time_ms": 550}, 
    {"ax": -0.24, "time_ms": 561}, {"ax": -0.24, "time_ms": 572}, {"ax": -0.29, "time_ms": 583}, 
    {"ax": -0.3, "time_ms": 594}, {"ax": -0.3, "time_ms": 605}, {"ax": -0.33, "time_ms": 616}, 
    {"ax": -0.32, "time_ms": 627}, {"ax": -0.38, "time_ms": 638}, {"ax": -0.4, "time_ms": 649}, 
    {"ax": -0.43, "time_ms": 660}, {"ax": -0.44, "time_ms": 671}, {"ax": -0.43, "time_ms": 682}, 
    {"ax": -0.45, "time_ms": 693}, {"ax": -0.41, "time_ms": 704}, {"ax": -0.44, "time_ms": 715}, 
    {"ax": -0.43, "time_ms": 726}, {"ax": -0.39, "time_ms": 737}, {"ax": -0.36, "time_ms": 748}, 
    {"ax": -0.36, "time_ms": 759}, {"ax": -0.32, "time_ms": 770}, {"ax": -0.33, "time_ms": 781}, 
    {"ax": -0.38, "time_ms": 792}, {"ax": -0.23, "time_ms": 803}, {"ax": -0.27, "time_ms": 814}, 
    {"ax": -0.26, "time_ms": 825}, {"ax": -0.26, "time_ms": 836}, {"ax": -0.26, "time_ms": 847}, 
    {"ax": -0.26, "time_ms": 858}, {"ax": -0.26, "time_ms": 869}, {"ax": -0.26, "time_ms": 880}, 
    {"ax": -0.26, "time_ms": 891}, {"ax": -0.31, "time_ms": 902}, {"ax": -0.31, "time_ms": 912}, 
    {"ax": -0.31, "time_ms": 923}, {"ax": -0.33, "time_ms": 934}, {"ax": -0.34, "time_ms": 945}, 
    {"ax": -0.35, "time_ms": 956}, {"ax": -0.34, "time_ms": 967}, {"ax": -0.36, "time_ms": 978}, 
    {"ax": -0.36, "time_ms": 989}, {"ax": -0.35, "time_ms": 1000}, {"ax": -0.36, "time_ms": 1011}, 
    {"ax": -0.35, "time_ms": 1022}, {"ax": -0.36, "time_ms": 1033}, {"ax": -0.35, "time_ms": 1044}, 
    {"ax": -0.33, "time_ms": 1055}, {"ax": -0.32, "time_ms": 1066}, {"ax": -0.31, "time_ms": 1077}, 
    {"ax": -0.32, "time_ms": 1088}, {"ax": -0.31, "time_ms": 1099}, {"ax": -0.32, "time_ms": 1110}, 
    {"ax": -0.32, "time_ms": 1121}, {"ax": -0.3, "time_ms": 1132}, {"ax": -0.31, "time_ms": 1142}, 
    {"ax": -0.31, "time_ms": 1153}, {"ax": -0.31, "time_ms": 1164}, {"ax": -0.31, "time_ms": 1175}, 
    {"ax": -0.31, "time_ms": 1186}, {"ax": -0.32, "time_ms": 1197}, {"ax": -0.33, "time_ms": 1208}, 
    {"ax": -0.34, "time_ms": 1219}, {"ax": -0.28, "time_ms": 1230}, {"ax": -0.35, "time_ms": 1241}, 
    {"ax": -0.31, "time_ms": 1252}, {"ax": -0.3, "time_ms": 1263}, {"ax": -0.32, "time_ms": 1274}, 
    {"ax": -0.31, "time_ms": 1285}, {"ax": 0.63, "time_ms": 1296}, {"ax": -1.17, "time_ms": 1307}, 
    {"ax": -0.47, "time_ms": 1318}, {"ax": -0.8, "time_ms": 1329}, {"ax": -0.8, "time_ms": 1340}, 
    {"ax": -1.36, "time_ms": 1351}, {"ax": -0.59, "time_ms": 1362}, {"ax": -0.56, "time_ms": 1373}, 
    {"ax": -0.33, "time_ms": 1384}, {"ax": -0.37, "time_ms": 1395}, {"ax": -0.31, "time_ms": 1406}, 
    {"ax": -0.32, "time_ms": 1417}, {"ax": -0.16, "time_ms": 1428}, {"ax": -0.17, "time_ms": 1439}, 
    {"ax": -0.12, "time_ms": 1450}, {"ax": -0.18, "time_ms": 1461}, {"ax": -0.28, "time_ms": 1472}, 
    {"ax": -0.3, "time_ms": 1483}, {"ax": -0.22, "time_ms": 1494}, {"ax": -0.14, "time_ms": 1505}, 
    {"ax": -0.14, "time_ms": 1516}, {"ax": -0.15, "time_ms": 1527}, {"ax": -0.25, "time_ms": 1538}, 
    {"ax": -0.28, "time_ms": 1549}, {"ax": -0.3, "time_ms": 1560}, {"ax": -0.3, "time_ms": 1571}, 
    {"ax": -0.32, "time_ms": 1582}, {"ax": -0.34, "time_ms": 1593}, {"ax": -0.3, "time_ms": 1604}, 
    {"ax": -0.32, "time_ms": 1615}, {"ax": -0.3, "time_ms": 1626}, {"ax": -0.45, "time_ms": 1637}, 
    {"ax": -0.48, "time_ms": 1648}, {"ax": -0.49, "time_ms": 1659}, {"ax": -0.52, "time_ms": 1670}, 
    {"ax": -0.52, "time_ms": 1681}, {"ax": -0.53, "time_ms": 1692}, {"ax": -0.46, "time_ms": 1703}, 
    {"ax": -0.41, "time_ms": 1714}, {"ax": -0.39, "time_ms": 1725}, {"ax": -0.39, "time_ms": 1736}, 
    {"ax": -0.34, "time_ms": 1747}, {"ax": -0.32, "time_ms": 1758}, {"ax": -0.28, "time_ms": 1768}, 
    {"ax": -0.25, "time_ms": 1779}, {"ax": -0.25, "time_ms": 1790}, {"ax": -0.27, "time_ms": 1801}, 
    {"ax": -0.29, "time_ms": 1812}, {"ax": -0.24, "time_ms": 1823}, {"ax": -0.28, "time_ms": 1834}, 
    {"ax": -0.25, "time_ms": 1845}, {"ax": -0.28, "time_ms": 1856}, {"ax": -0.26, "time_ms": 1867}, 
    {"ax": -0.25, "time_ms": 1878}, {"ax": -0.24, "time_ms": 1889}, {"ax": -0.27, "time_ms": 1900}, 
    {"ax": -0.29, "time_ms": 1910}, {"ax": -0.29, "time_ms": 1921}, {"ax": -0.31, "time_ms": 1932}, 
    {"ax": -0.28, "time_ms": 1943}, {"ax": -0.33, "time_ms": 1954}, {"ax": -0.38, "time_ms": 1965}, 
    {"ax": -0.4, "time_ms": 1976}, {"ax": -0.38, "time_ms": 1987}, {"ax": -0.38, "time_ms": 1998}, 
    {"ax": -0.37, "time_ms": 2009}, {"ax": -0.38, "time_ms": 2020}, {"ax": -0.39, "time_ms": 2031}, 
    {"ax": -0.39, "time_ms": 2042}, {"ax": -0.38, "time_ms": 2052}, {"ax": -0.33, "time_ms": 2063}, 
    {"ax": -0.32, "time_ms": 2074}, {"ax": -0.32, "time_ms": 2085}, {"ax": -0.32, "time_ms": 2096}, 
    {"ax": -0.32, "time_ms": 2107}, {"ax": -0.3, "time_ms": 2118}, {"ax": -0.3, "time_ms": 2129}, 
    {"ax": -0.34, "time_ms": 2140}, {"ax": -0.28, "time_ms": 2151}, {"ax": -0.28, "time_ms": 2162}, 
    {"ax": -0.29, "time_ms": 2173}, {"ax": -0.28, "time_ms": 2184}
];

export async function GET(
  request: NextRequest,
  { params }: { params: { project: string } }
) {
  const projectId = params.project;
  
  try {
    const project = await getSingleProject(projectId);
    console.log("Project URL:", project?.experiment_URL);
    
    if (!project?.experiment_URL) {
      throw new Error('No experiment URL configured');
    }

    // Call our Express API server instead of Pico directly
    const response = await fetch(`${backendURL}/api/experiment/${projectId}?picoUrl=${encodeURIComponent(project.experiment_URL)}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Experiment data retrieved',
      projectId,
      data: result.data
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    
    return NextResponse.json({
      success: false,
      message: 'Using sample data',
      warning: `Failed to get live data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      projectId,
      data: sampleData
    });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { project: string } }
) {
  try {
    const data = await request.json();
    const projectId = params.project;
    
    // Get the project to get the experiment_URL
    const project = await getSingleProject(projectId);
    console.log("project to get the experiment_URL", project?.experiment_URL)
    if (!project?.experiment_URL) {
      throw new Error('No experiment URL found');
    }

    const response = await fetch(`${project.experiment_URL}/collect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data),
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Data point added successfully',
      projectId,
      data: result
    }, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process data',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      }
    );
  }
} 