import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth-service';
import { dataService } from '@/lib/data-service';

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action, collection, id, data } = await req.json();

    switch (collection) {
      case 'profile':
        if (action === 'update') {
          const updated = await dataService.updateProfile(data);
          return NextResponse.json({ success: true, data: updated });
        }
        break;

      case 'experience':
        if (action === 'create') {
          const created = await dataService.createExperience(data);
          return NextResponse.json({ success: true, data: created });
        } else if (action === 'update' && id) {
          const updated = await dataService.updateExperience(id, data);
          return NextResponse.json({ success: true, data: updated });
        } else if (action === 'delete' && id) {
          await dataService.deleteExperience(id);
          return NextResponse.json({ success: true });
        }
        break;

      case 'education':
        if (action === 'create') {
          const created = await dataService.createEducation(data);
          return NextResponse.json({ success: true, data: created });
        } else if (action === 'update' && id) {
          const updated = await dataService.updateEducation(id, data);
          return NextResponse.json({ success: true, data: updated });
        } else if (action === 'delete' && id) {
          await dataService.deleteEducation(id);
          return NextResponse.json({ success: true });
        }
        break;

      case 'skill':
        if (action === 'create') {
          const created = await dataService.createSkill(data);
          return NextResponse.json({ success: true, data: created });
        } else if (action === 'update' && id) {
          const updated = await dataService.updateSkill(id, data);
          return NextResponse.json({ success: true, data: updated });
        } else if (action === 'delete' && id) {
          await dataService.deleteSkill(id);
          return NextResponse.json({ success: true });
        }
        break;

      case 'project':
        if (action === 'create') {
          const created = await dataService.createProject(data);
          return NextResponse.json({ success: true, data: created });
        } else if (action === 'update' && id) {
          const updated = await dataService.updateProject(id, data);
          return NextResponse.json({ success: true, data: updated });
        } else if (action === 'delete' && id) {
          await dataService.deleteProject(id);
          return NextResponse.json({ success: true });
        }
        break;

      case 'research':
        if (action === 'create') {
          const created = await dataService.createResearch(data);
          return NextResponse.json({ success: true, data: created });
        } else if (action === 'update' && id) {
          const updated = await dataService.updateResearch(id, data);
          return NextResponse.json({ success: true, data: updated });
        } else if (action === 'delete' && id) {
          await dataService.deleteResearch(id);
          return NextResponse.json({ success: true });
        }
        break;

      case 'certification':
        if (action === 'create') {
          const created = await dataService.createCertification(data);
          return NextResponse.json({ success: true, data: created });
        } else if (action === 'update' && id) {
          const updated = await dataService.updateCertification(id, data);
          return NextResponse.json({ success: true, data: updated });
        } else if (action === 'delete' && id) {
          await dataService.deleteCertification(id);
          return NextResponse.json({ success: true });
        }
        break;

      case 'document':
        if (action === 'create') {
          const created = await dataService.createDocument(data);
          return NextResponse.json({ success: true, data: created });
        } else if (action === 'update' && id) {
          const updated = await dataService.updateDocument(id, data);
          return NextResponse.json({ success: true, data: updated });
        } else if (action === 'delete' && id) {
          await dataService.deleteDocument(id);
          return NextResponse.json({ success: true });
        } else if (action === 'set_cv' && id) {
          const current = await dataService.setCurrentCV(id);
          return NextResponse.json({ success: true, data: current });
        }
        break;

      case 'blog':
        if (action === 'create') {
          const created = await dataService.createBlogPost(data);
          return NextResponse.json({ success: true, data: created });
        } else if (action === 'update' && id) {
          const updated = await dataService.updateBlogPost(id, data);
          return NextResponse.json({ success: true, data: updated });
        } else if (action === 'delete' && id) {
          await dataService.deleteBlogPost(id);
          return NextResponse.json({ success: true });
        }
        break;

      case 'media':
        if (action === 'create') {
          const created = await dataService.createMediaItem(data);
          return NextResponse.json({ success: true, data: created });
        } else if (action === 'delete' && id) {
          await dataService.deleteMediaItem(id);
          return NextResponse.json({ success: true });
        }
        break;

      case 'message':
        if (action === 'mark_read' && id) {
          await dataService.markMessageRead(id);
          return NextResponse.json({ success: true });
        } else if (action === 'delete' && id) {
          await dataService.deleteContactMessage(id);
          return NextResponse.json({ success: true });
        }
        break;

      case 'settings':
        if (action === 'update') {
          const updated = await dataService.updateSiteSettings(data);
          return NextResponse.json({ success: true, data: updated });
        }
        break;

      default:
        return NextResponse.json({ success: false, message: 'Invalid collection' }, { status: 400 });
    }

    return NextResponse.json({ success: false, message: 'Action not supported' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || 'Operation failed' }, { status: 500 });
  }
}
