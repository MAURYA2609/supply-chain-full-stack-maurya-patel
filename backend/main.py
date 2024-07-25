import csv
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import logging

app = FastAPI()

#Logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Helper to read CSVs
def read_csv(file_path):
    with open(file_path, mode='r') as file:
        reader = csv.DictReader(file)
        return list(reader)

# Load data from CSV files
companies = read_csv('data/companies.csv')
locations = read_csv('data/locations.csv')

# Get all companies
@app.get("/companies", summary="Get all companies", response_description="List of all companies")
async def get_all_companies():
    if not companies:
        logger.warning("No companies data found")
        raise HTTPException(status_code=404, detail="No companies found")
    logger.info("Fetched all companies")
    return JSONResponse(content=companies)

