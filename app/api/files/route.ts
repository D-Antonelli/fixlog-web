import { NextRequest, NextResponse } from "next/server";
import { pinata } from "@/utils/config";


export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const files: File[] = [];

    // Loop through formData to gather all files
    data.forEach((value, key) => {
      if (key === "file" && value instanceof File) {
        files.push(value);
      }
    });

    // If no files were uploaded
    if (files.length === 0) {
      return NextResponse.json({error: "No files uploaded"}, {status: 400});
    }

    // Upload the array of files to Pinata
    const uploadData = await pinata.upload.fileArray(files);

    return NextResponse.json(uploadData, {status: 200});
  } catch (e) {
    console.log(e);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}

export async function GET() {
	try {
		const response = await pinata.listFiles();
		return NextResponse.json(response[0]);
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
