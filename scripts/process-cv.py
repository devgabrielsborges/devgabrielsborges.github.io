#!/usr/bin/env python3

import json
import os
from pathlib import Path
from typing import Dict, List, Any
import re
from datetime import datetime

try:
    from docling.document_converter import DocumentConverter
except ImportError:
    import subprocess
    import sys
    print("📦 Installing docling...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "docling"])
    from docling.document_converter import DocumentConverter

class CVProcessor:
    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.cv_path = project_root / "public" / "profile.pdf"
        self.output_path = project_root / "public" / "cv-content.json"
        
        # Initialize document converter with simpler configuration
        self.converter = DocumentConverter()
    
    def extract_cv_content(self) -> Dict[str, Any]:
        """Extract and structure content from CV PDF using Docling"""
        print(f"🔍 Processing CV PDF: {self.cv_path}")
        
        if not self.cv_path.exists():
            raise FileNotFoundError(f"CV file not found: {self.cv_path}")
        
        # Convert PDF to structured document
        result = self.converter.convert(str(self.cv_path))
        doc = result.document
        
        # Extract markdown content
        markdown_content = doc.export_to_markdown()
        
        print(f"📄 Extracted {len(markdown_content)} characters from CV")
        
        # Parse the markdown content into structured sections
        structured_content = self._parse_cv_sections(markdown_content)
        
        return structured_content
    
    def _parse_cv_sections(self, markdown_content: str) -> Dict[str, Any]:
        """Parse markdown content into structured sections"""
        sections = {
            "personal_info": {},
            "summary": "",
            "experience": [],
            "education": [],
            "skills": [],
            "projects": [],
            "certifications": [],
            "languages": [],
            "raw_markdown": markdown_content,
            "last_updated": datetime.now().isoformat()
        }
        
        # Split content by lines for processing
        lines = markdown_content.split('\n')
        current_section = None
        current_item = {}
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            # Detect sections based on common CV patterns
            if self._is_header(line):
                section_type = self._identify_section_type(line)
                if section_type:
                    current_section = section_type
                    if current_item and current_section in ["experience", "education", "projects", "certifications"]:
                        sections[current_section].append(current_item)
                        current_item = {}
                continue
            
            # Extract personal information
            if current_section == "personal_info" or not current_section:
                self._extract_personal_info(line, sections["personal_info"])
            
            # Extract content based on current section
            elif current_section == "summary":
                if sections["summary"]:
                    sections["summary"] += " " + line
                else:
                    sections["summary"] = line
            
            elif current_section in ["experience", "education", "projects", "certifications"]:
                if self._looks_like_title_or_position(line):
                    if current_item:
                        sections[current_section].append(current_item)
                    current_item = {"title": line, "details": []}
                elif current_item:
                    current_item["details"].append(line)
            
            elif current_section == "skills":
                skills_found = self._extract_skills(line)
                sections["skills"].extend(skills_found)
            
            elif current_section == "languages":
                # Handle languages section specially to parse multiple languages from one line
                if 'inglês' in line.lower() and 'português' in line.lower():
                    # Parse line with multiple languages
                    english_match = re.search(r'inglês\s*\(([^)]+)\)', line, re.IGNORECASE)
                    portuguese_match = re.search(r'português\s*\(([^)]+)\)', line, re.IGNORECASE)
                    
                    if english_match:
                        sections["languages"].append({
                            'language': 'Inglês',
                            'level': english_match.group(1).strip()
                        })
                    if portuguese_match:
                        sections["languages"].append({
                            'language': 'Português',
                            'level': portuguese_match.group(1).strip()
                        })
                else:
                    lang_info = self._extract_language_info(line)
                    if lang_info:
                        sections["languages"].append(lang_info)
        
        # Add the last item if exists
        if current_item and current_section in ["experience", "education", "projects", "certifications"]:
            sections[current_section].append(current_item)
        
        # Clean and format the extracted data
        sections = self._clean_and_format_sections(sections)
        
        return sections
    
    def _is_header(self, line: str) -> bool:
        """Check if line is a section header"""
        return (line.startswith('#') or 
                line.isupper() or 
                len(line) < 50 and not any(char in line for char in '.,;:'))
    
    def _identify_section_type(self, line: str) -> str:
        """Identify the type of section based on header text"""
        line_lower = line.lower().replace('#', '').strip()
        
        section_mapping = {
            'experience': ['experiência', 'experience', 'trabalho', 'work', 'profissional', 'facepe', 'open source', 'universidade de pernambuco'],
            'education': ['educação', 'education', 'formação acadêmica', 'formação', 'academic', 'ensino', 'bacharelado', 'graduação'],
            'skills': ['habilidades', 'skills', 'competências', 'tecnologias', 'tech', 'técnicas'],
            'projects': ['projetos', 'projects'],
            'certifications': ['certificações', 'certifications', 'cursos', 'courses'],
            'languages': ['idiomas', 'languages', 'línguas', 'idioma'],
            'summary': ['resumo', 'summary', 'perfil', 'profile', 'sobre', 'about']
        }
        
        for section, keywords in section_mapping.items():
            if any(keyword in line_lower for keyword in keywords):
                return section
        
        return None
    
    def _extract_personal_info(self, line: str, personal_info: Dict):
        """Extract personal information from line"""
        # Name pattern - look for clear name indicators
        if any(indicator in line.lower() for indicator in ['gabriel borges', 'gabriel souza borges']):
            personal_info['name'] = 'Gabriel Borges'
        
        # Email pattern
        email_match = re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', line)
        if email_match:
            personal_info['email'] = email_match.group()
        
        # Phone pattern (Brazilian format)
        phone_match = re.search(r'\(?\d{2}\)?\s?\d{4,5}-?\d{4}', line)
        if phone_match:
            personal_info['phone'] = phone_match.group()
        
        # LinkedIn pattern
        if 'linkedin' in line.lower():
            linkedin_match = re.search(r'linkedin\.com/in/([^\s)]+)', line)
            if linkedin_match:
                personal_info['linkedin'] = linkedin_match.group(1).strip()
        
        # GitHub pattern
        if 'github' in line.lower():
            github_match = re.search(r'github\.com/([^\s)]+)', line)
            if github_match:
                personal_info['github'] = github_match.group(1).strip()
        
        # Location pattern - be very specific to avoid skills
        if 'recife, pernambuco, brasil' in line.lower():
            personal_info['location'] = 'Recife, Pernambuco, Brasil'
        # Don't extract location from lines that contain technical terms
        elif ('recife' in line.lower() and 'pernambuco' in line.lower() and 
              not any(tech_word in line.lower() for tech_word in ['competências', 'skills', 'software', 'algoritmos', 'python', 'java', 'código'])):
            personal_info['location'] = line
    
    def _looks_like_title_or_position(self, line: str) -> bool:
        """Check if line looks like a job title or position"""
        return (len(line) < 100 and 
                not line.startswith('•') and 
                not line.startswith('-') and
                not any(char in line for char in '.,;:') and
                line[0].isupper())
    
    def _extract_skills(self, line: str) -> List[str]:
        """Extract skills from a line"""
        # Common skill separators
        separators = [',', '|', '•', '-', '/', ';']
        
        for sep in separators:
            if sep in line:
                skills = [skill.strip() for skill in line.split(sep)]
                return [skill for skill in skills if skill and len(skill) > 1]
        
        # If no separators, treat the whole line as a skill if it's short enough
        if len(line) < 30:
            return [line]
        
        return []
    
    def _extract_language_info(self, line: str) -> Dict[str, str]:
        """Extract language and proficiency information"""
        # Pattern: Language (Level) or Language - Level
        patterns = [
            r'([^(]+)\s*\(([^)]+)\)',
            r'([^-]+)\s*-\s*([^-]+)',
            r'([^:]+):\s*([^:]+)'
        ]
        
        for pattern in patterns:
            match = re.search(pattern, line)
            if match:
                return {
                    'language': match.group(1).strip(),
                    'level': match.group(2).strip()
                }
        
        # Special handling for Portuguese/English patterns
        if 'português' in line.lower() and ('nativo' in line.lower() or 'fluente' in line.lower()):
            return {'language': 'Português', 'level': 'Nativo'}
        elif 'inglês' in line.lower() or 'english' in line.lower():
            if 'profissional' in line.lower():
                return {'language': 'Inglês', 'level': 'Profissional'}
            elif 'fluente' in line.lower():
                return {'language': 'Inglês', 'level': 'Fluente'}
            else:
                return {'language': 'Inglês', 'level': 'Intermediário'}
        
        # If it's just a language name, add it with unspecified level
        if len(line) < 50 and any(lang in line.lower() for lang in ['português', 'inglês', 'english', 'espanhol', 'francês']):
            return {'language': line, 'level': 'Not specified'}
        
        return None
    
    def _clean_and_format_sections(self, sections: Dict[str, Any]) -> Dict[str, Any]:
        """Clean and format extracted sections"""
        # Remove duplicates from skills and clean them
        if sections['skills']:
            cleaned_skills = []
            for skill in sections['skills']:
                # Clean up skill names
                if ':' in skill:
                    skill = skill.split(':')[-1].strip()
                if len(skill) > 3 and 'linguagens de programação' not in skill.lower() and 'ferramentas' not in skill.lower():
                    cleaned_skills.append(skill)
            sections['skills'] = list(set(cleaned_skills))
        
        # Clean and consolidate experience entries
        consolidated_experiences = []
        facepe_entry = None
        open_source_entry = None
        monitor_entry = None
        
        for exp in sections['experience']:
            if 'details' in exp:
                exp['description'] = ' '.join(exp['details'])
                
                # Extract proper dates from description or title
                date_patterns = [
                    r'(maio de 2025\s*[-–]\s*present)',
                    r'(março de 2025\s*[-–]\s*julho de 2025)',
                    r'(\d{4}\s*[-–]\s*\d{4})',
                    r'(\d{4}\s*[-–]\s*presente|present)'
                ]
                
                period_found = None
                for pattern in date_patterns:
                    date_match = re.search(pattern, exp['description'], re.IGNORECASE)
                    if not date_match:
                        date_match = re.search(pattern, exp['title'], re.IGNORECASE)
                    if date_match:
                        period_found = date_match.group(1)
                        break
                
                # Consolidate FACEPE experiences
                if 'facepe' in exp['title'].lower() or 'bolsista' in exp['title'].lower() or 'líder de ciência' in exp['title'].lower():
                    if not facepe_entry:
                        facepe_entry = {
                            'title': 'Bolsista de Extensão Tecnológica & Líder de Ciência de Dados',
                            'company': 'FACEPE - Fundação de Amparo à Ciência e Tecnologia do Estado de Pernambuco',
                            'period': period_found or 'maio de 2025 - Present',
                            'description': 'Líder de Ciência de Dados no Projeto de Extensão Tecnológica "Inteligência Artificial de Pré-diagnóstico para Auxiliar na Tomada de Decisões em Teleconsultas no CISAM".'
                        }
                    continue
                
                # Consolidate Open Source experience
                elif 'open source' in exp['title'].lower() or 'maintainer' in exp['title'].lower():
                    if not open_source_entry:
                        open_source_entry = {
                            'title': 'Open Source Developer & Mantenedor de Pacotes Python',
                            'company': 'Open Source Community',
                            'period': period_found or 'maio de 2025 - Present',
                            'description': 'Desenvolvimento, manutenção e publicação de pacotes Python de código aberto focados em automação, IA e produtividade. Projeto em destaque: Handmark - ferramenta CLI que converte anotações manuscritas em Markdown usando IA multimodal e OCR.'
                        }
                    continue
                
                # Monitor position
                elif 'monitor' in exp['title'].lower():
                    if not monitor_entry:
                        monitor_entry = {
                            'title': 'Monitor de Linguagem de Programação Imperativa (C)',
                            'company': 'Universidade de Pernambuco',
                            'period': period_found or 'março de 2025 - julho de 2025',
                            'description': 'Ministração de aulas sobre conceitos fundamentais da linguagem C, incluindo alocação dinâmica de memória, ponteiros, structs, compilação e otimização. Consultoria em projetos com GCC, CMake e aplicações GTK para Linux e Windows.'
                        }
                    continue
                
                # Other experiences - clean them up
                else:
                    clean_exp = {
                        'title': exp['title'],
                        'period': period_found or None,
                        'description': exp['description']
                    }
                    
                    # Extract company from title if possible
                    if 'universidade' in exp['title'].lower():
                        clean_exp['company'] = 'Universidade de Pernambuco'
                    
                    consolidated_experiences.append(clean_exp)
        
        # Also check education entries for Monitor position and move to experience
        for edu in sections['education']:
            if 'details' in edu:
                edu_description = ' '.join(edu['details'])
                if 'monitor' in edu['title'].lower() and not monitor_entry:
                    date_match = re.search(r'(março de 2025\s*[-–]\s*julho de 2025)', edu_description, re.IGNORECASE)
                    period = date_match.group(1) if date_match else 'março de 2025 - julho de 2025'
                    
                    monitor_entry = {
                        'title': 'Monitor de Linguagem de Programação Imperativa (C)',
                        'company': 'Universidade de Pernambuco',
                        'period': period,
                        'description': 'Ministração de aulas sobre conceitos fundamentais da linguagem C, incluindo alocação dinâmica de memória, ponteiros, structs, compilação e otimização. Consultoria em projetos com GCC, CMake e aplicações GTK para Linux e Windows.'
                    }
        
        # Add consolidated entries in order
        if facepe_entry:
            consolidated_experiences.insert(0, facepe_entry)
        if open_source_entry:
            consolidated_experiences.insert(1 if facepe_entry else 0, open_source_entry)
        if monitor_entry:
            consolidated_experiences.append(monitor_entry)
        
        sections['experience'] = consolidated_experiences
        
        # Clean education entries
        cleaned_education = []
        for edu in sections['education']:
            if 'details' in edu:
                edu['description'] = ' '.join(edu['details'])
                
                # Only keep actual education entries
                if not ('monitor' in edu['title'].lower() or 'bolsista' in edu['title'].lower()):
                    # Extract proper period for education
                    date_match = re.search(r'(abril de 2024\s*[-–]\s*dezembro de 2028)', edu['description'], re.IGNORECASE)
                    if date_match:
                        edu['period'] = date_match.group(1)
                    else:
                        edu['period'] = 'abril de 2024 - dezembro de 2028 (previsão)'
                    
                    cleaned_education.append(edu)
        
        sections['education'] = cleaned_education
        
        # Ensure summary is not too long
        if len(sections['summary']) > 1000:
            sections['summary'] = sections['summary'][:1000] + '...'
        
        # Add missing personal info with defaults
        if 'name' not in sections['personal_info']:
            sections['personal_info']['name'] = 'Gabriel Borges'
        if 'location' not in sections['personal_info']:
            sections['personal_info']['location'] = 'Recife, Pernambuco, Brasil'
        if 'github' not in sections['personal_info']:
            sections['personal_info']['github'] = 'devgabrielsborges'
        if 'linkedin' not in sections['personal_info']:
            sections['personal_info']['linkedin'] = 'devgabrielsborges'
        
        # Add default languages if none found
        if not sections['languages']:
            sections['languages'] = [
                {'language': 'Português', 'level': 'Nativo'},
                {'language': 'Inglês', 'level': 'Profissional'}
            ]
        
        return sections
    
    def save_cv_content(self, cv_content: Dict[str, Any]):
        """Save processed CV content to JSON file"""
        print(f"💾 Saving CV content to: {self.output_path}")
        
        with open(self.output_path, 'w', encoding='utf-8') as f:
            json.dump(cv_content, f, indent=2, ensure_ascii=False)
        
        print("✅ CV content saved successfully!")
    
    def process(self):
        """Main processing method"""
        try:
            print("🚀 Starting CV processing...")
            cv_content = self.extract_cv_content()
            self.save_cv_content(cv_content)
            
            # Print summary
            print("\n📊 Processing Summary:")
            print(f"   📧 Email: {cv_content['personal_info'].get('email', 'Not found')}")
            print(f"   📍 Location: {cv_content['personal_info'].get('location', 'Not found')}")
            print(f"   💼 Experience entries: {len(cv_content['experience'])}")
            print(f"   🎓 Education entries: {len(cv_content['education'])}")
            print(f"   🛠️  Skills: {len(cv_content['skills'])}")
            print(f"   🗣️  Languages: {len(cv_content['languages'])}")
            print(f"   📝 Summary length: {len(cv_content['summary'])} characters")
            
        except Exception as e:
            print(f"❌ Error processing CV: {e}")
            raise

def main():
    """Main function"""
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    
    processor = CVProcessor(project_root)
    processor.process()

if __name__ == "__main__":
    main()
