//���������� ����������� ����������
#include <math.h>
#include "..\\..\\..\\Source\\GraphanLib\\GraphmatFile.h"
#include "..\\..\\..\\Source\\common\\util_classes.h"
#pragma comment (lib,"..\\..\\..\\Source\\common\\Debug\\common.lib")
#pragma comment (lib,"..\\..\\..\\Source\\GraphanLib\\Debug\\GraphanLib.lib")
#pragma comment (lib,"..\\..\\..\\Source\\StructDictLib\\Debug\\StructDictLib.lib")
//----------------------------------
int main(){
	MorphLanguageEnum Langua;
	GetLanguageByString("Russian", Langua);//����� �����
	string InputFile = "C:\\Users\\hp9\\IdeaProjects\\LinguisticAnnotationSystem\\text\\input.txt";//������� ���� html ��� txt � ��������� CP-1251
	string GraFile = "C:\\Users\\hp9\\IdeaProjects\\LinguisticAnnotationSystem\\text\\output.gra";//���� � ��������� ����� *.gra (����������� ������� ���������), ���� ������ ������ ��� �����,�� �� ����� ������ � ����� �������(����� � �������� �����) 
	CGraphmatFile Graphan; //��������� ������� �����������
	Graphan.m_Language = Langua; // ������� �����
	if (!Graphan.LoadDicts()) //�������� ��������(���������� ����� RML �����������!)
	{
		printf("Cannot load dictionaries \n");
		printf("Error: %s\n", Graphan.GetLastError().c_str());
		return 1;
	};
	//������� ���������� ������
	Graphan.m_bSentBreaker = true;
	Graphan.m_bUseParagraphTagToDivide = false;
	Graphan.m_bFilterUnprintableSymbols = false;
	Graphan.m_GraOutputFile = GraFile;
	Graphan.m_bUseIndention = true;
	//-----------------------------
	fprintf(stderr, "Loading file %s\n", InputFile.c_str());//�������� ����������� �������� �����
	if (!Graphan.LoadFileToGraphan(InputFile))// ���������� ������
	{
		fprintf(stderr, "Cannot load file %s \n", InputFile.c_str());
		fprintf(stderr, "Error: %s\n", Graphan.GetLastError().c_str());
		return 1;
	};
	return 0;
}